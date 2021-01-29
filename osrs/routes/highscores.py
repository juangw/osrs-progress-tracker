from osrs.app import app
from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType
from osrs.models.skills import Skills
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses

from typing import Mapping, Union


@app.get("/highscores/skills/{username}", tags=["Highscores"], response_model=Skills)
def get_skills_for_user(username: str, account_type: AccountType):
    user_stats = Highscores(username, AccountType.NORMAL)
    user_stats.set_user_highscores()
    return user_stats.skills


@app.get("/highscores/minigames/{username}", tags=["Highscores"], response_model=Minigames)
def get_minigames_for_user(username: str, account_type: AccountType):
    user_stats = Highscores(username, AccountType.NORMAL)
    user_stats.set_user_highscores()
    return user_stats.minigames


@app.get("/highscores/bosses/{username}", tags=["Highscores"], response_model=Bosses)
def get_bosses_for_user(username: str, account_type: AccountType):
    user_stats = Highscores(username, AccountType.NORMAL)
    user_stats.set_user_highscores()
    return user_stats.bosses
