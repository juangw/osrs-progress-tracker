from osrs.config import CONFIG, ENV
from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType

from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from typing import Iterable, Mapping, Any
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor

import requests
import asyncio
import uvicorn
import os

app = FastAPI()


def get_player_stats():
    def get_users() -> Iterable[Mapping[str, Any]]:
        url = CONFIG[ENV].get("API_URL")
        return requests.get(url=f"{url}/highscores/usernames").json()

    async def insert_user_stats(user_data: Mapping[str, Any]) -> None:
        url = CONFIG[ENV].get("API_URL")
        username, account_type = user_data["username"], user_data["account_type"]
        result = requests.put(
            url=f"{url}/highscores/{username}?account_type={account_type}"
        ).json()
        # TODO: make this async
        await asyncio.sleep(1)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    users = get_users()
    try:
        results = loop.run_until_complete(
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

    # Start backend cron job
    cron.add_job(get_player_stats, trigger="interval", days=1)
    cron.start()


from osrs.routes.healthcheck import *
from osrs.routes.highscores import *
from osrs.routes.grand_exchange import *
from osrs.db import init_db
