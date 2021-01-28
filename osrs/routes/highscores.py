from osrs.app import app
from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType


@app.get("/skills/{username}")
def get_skills_for_user(username: str, account_type: AccountType):
    user_stats = Highscores(username, AccountType.NORMAL)
    user_stats.set_user_highscores()
    return {"username": username, "skills": user_stats.skills}


@app.get("/minigames/{username}")
def get_minigames_for_user(username: str, account_type: AccountType):
    user_stats = Highscores(username, AccountType.NORMAL)
    user_stats.set_user_highscores()
    return {"username": username, "minigames": user_stats.minigames}


@app.get("/bosses/{username}")
def get_bosses_for_user(username: str, account_type: AccountType):
    user_stats = Highscores(username, AccountType.NORMAL)
    user_stats.set_user_highscores()
    return {"username": username, "bosses": user_stats.bosses}