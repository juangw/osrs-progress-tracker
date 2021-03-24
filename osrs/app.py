from osrs.config import CONFIG, ENV
from osrs.db import init_db

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from typing import Iterable, Mapping, Any

import requests
import asyncio

origins = [
    "http://localhost:3000",
    "http://localhost:5000",  # Local front end
    "https://osrs-progress-tracker-ui.herokuapp.com",  # Production front end
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_player_stats():
    def get_users() -> Iterable[Mapping[str, Any]]:
        url = CONFIG[ENV].get("API_URL")
        return requests.get(url=f"{url}/highscores/usernames").json()

    async def insert_user_stats(user_data: Mapping[str, Any]) -> None:
        url = CONFIG[ENV].get("API_URL")
        username, account_type = user_data["username"], user_data["account_type"]
        requests.post(
            url=f"{url}/highscores/{username}?account_type={account_type}"
        ).json()
        # TODO: make this async
        await asyncio.sleep(1)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    users = get_users()
    try:
        loop.run_until_complete(
            asyncio.gather(*[insert_user_stats(user) for user in users])
        )
    except Exception as e:
        print(e)
        loop.close()


# Start scheduling backend
job_defaults = {"coalesce": False, "max_instances": 1}
cron = BackgroundScheduler(job_defaults=job_defaults, daemon=True)


@app.on_event("startup")
def cron_job():
    # Init db tables
    init_db()

    # apply routes to app
    from osrs.routes import healthcheck  # noqa: F401
    from osrs.routes import highscores  # noqa: F401
    from osrs.routes import grand_exchange  # noqa: F401

    # Start backend cron job
    cron.add_job(get_player_stats, trigger="interval", hours=6)
    cron.start()
