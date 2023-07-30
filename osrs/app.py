from osrs.config import CONFIG, ENV
from osrs.db import init_db

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.interval import IntervalTrigger
from typing import Iterable, Mapping, Any

import requests
import logging
import aiohttp
import asyncio
import os

# Configure the root log level and ensure all logs are sent to Gunicorn's error log.
gunicorn_error_logger = logging.getLogger("gunicorn.error")
logging.root.handlers.extend(gunicorn_error_logger.handlers)
logging.root.setLevel(logging.INFO)

if os.environ.get("DEBUG_QUERY", False):
    logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

origins = [
    "http://localhost:3000",
    "http://localhost:5000",  # Local front end
    "https://osrs-progress-tracker-ui.onrender.com",  # Production front end
]

app = FastAPI(
    servers=[
        {
            "url": "https://osrs-progress-tracker-backend.onrender.com",
            "description": "production environment",
        }
    ],
    root_path="/api",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Start scheduling backend
job_defaults = {"coalesce": False, "max_instances": 1, "misfire_grace_time": 15 * 60}
cron = AsyncIOScheduler(job_defaults=job_defaults, daemon=True)


async def get_player_stats():
    def get_users() -> Iterable[Mapping[str, Any]]:
        url = CONFIG[ENV].get("API_URL")
        return requests.get(url=f"{url}/highscores/usernames").json()

    async def insert_user_stats(user_data: Mapping[str, Any]) -> None:
        url = CONFIG[ENV].get("API_URL")
        username, account_type = user_data["username"], user_data["account_type"]
        async with aiohttp.ClientSession() as session:
            response = await session.post(
                url=f"{url}/highscores/{username}?account_type={account_type}"
            )
            logging.info(f"{response.url} - {response.status}")
            return

    users = get_users()
    try:
        await asyncio.gather(*[insert_user_stats(user) for user in users])
    except Exception as e:
        print(e)


async def keep_instance_alive():
    url = CONFIG[ENV].get("API_URL")
    async with aiohttp.ClientSession() as session:
        response = await session.get(url=f"{url}/healthcheck")
        logging.info(f"{response.url} - {response.status}")
        return


@app.on_event("startup")
def startup():
    # Init db tables
    init_db()

    # apply routes to app
    from osrs.routes import healthcheck  # noqa: F401
    from osrs.routes import highscores  # noqa: F401
    from osrs.routes import grand_exchange  # noqa: F401
    from osrs.routes import donations  # noqa: F401

    #  Start backend crone job once per day at noon to fetch user stats
    cron.add_job(get_player_stats, CronTrigger(hour=12, timezone="America/Detroit"))
    cron.add_job(
        keep_instance_alive, IntervalTrigger(minutes=1, timezone="America/Detroit")
    )
    cron.start()

    try:
        # Keep the main thread running, as the scheduler runs in the background
        asyncio.get_event_loop()
    except (KeyboardInterrupt, SystemExit):
        # Gracefully shutdown the scheduler on keyboard interrupt or system exit
        cron.shutdown()
