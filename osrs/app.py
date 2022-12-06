from osrs.config import CONFIG, ENV
from osrs.db import init_db

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from typing import Iterable, Mapping, Any

import requests
import aiohttp
import asyncio
import os

if os.environ.get("DEBUG_QUERY", False):
    import logging

    logging.basicConfig()
    logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

origins = [
    "http://localhost:3000",
    "http://localhost:5000",  # Local front end
    "https://osrs-progress-tracker-ui.fly.dev",  # Production front end
]

app = FastAPI(
    servers=[
        {
            "url": "https://osrs-progress-tracker.fly.dev",
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
job_defaults = {"coalesce": False, "max_instances": 1}
cron = AsyncIOScheduler(job_defaults=job_defaults, daemon=True)


def get_player_stats():
    def get_users() -> Iterable[Mapping[str, Any]]:
        url = CONFIG[ENV].get("API_URL")
        return requests.get(url=f"{url}/highscores/usernames").json()

    async def insert_user_stats(user_data: Mapping[str, Any]) -> None:
        url = CONFIG[ENV].get("API_URL")
        username, account_type = user_data["username"], user_data["account_type"]
        async with aiohttp.ClientSession() as session:
            response = session.post(
                url=f"{url}/highscores/{username}?account_type={account_type}"
            )
            return await response

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    users = get_users()
    try:
        loop.run_until_complete(
            asyncio.gather(*[insert_user_stats(user) for user in users])
        )
    except Exception as e:
        print(e)


# Start backend cron job once per day at Noon
cron_trigger = CronTrigger(hour=12, timezone="America/Detroit")


@app.on_event("startup")
def startup():
    # Init db tables
    init_db()

    # apply routes to app
    from osrs.routes import healthcheck  # noqa: F401
    from osrs.routes import highscores  # noqa: F401
    from osrs.routes import grand_exchange  # noqa: F401
    from osrs.routes import donations  # noqa: F401

    cron.add_job(get_player_stats, cron_trigger)
    cron.start()
