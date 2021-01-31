from osrs.app import app
from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType
from osrs.models.skills import Skills
from osrs.models.skills_summary import SkillsSummary
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.database.highscores import (
    insert_user_highscores,
    append_user_highscores,
    get_unique_usernames,
    get_all_username_data,
)
from osrs.db import get_db_session, Highscores as DBHighscores

from sqlalchemy.orm import Session
from typing import Mapping, Union, Iterable
from fastapi import Depends


@app.get(
    "/highscores/skills_summary/{username}",
    tags=["Highscores"],
    response_model=SkillsSummary,
)
def get_skills_summary_for_user(
    username: str, account_type: AccountType
) -> SkillsSummary:
    user_stats = Highscores(username, account_type)
    user_stats.set_user_highscores()
    return user_stats.skills_summary


@app.get("/highscores/skills/{username}", tags=["Highscores"], response_model=Skills)
def get_skills_for_user(username: str, account_type: AccountType) -> Skills:
    user_stats = Highscores(username, account_type)
    user_stats.set_user_highscores()
    return user_stats.skills


@app.get(
    "/highscores/minigames/{username}", tags=["Highscores"], response_model=Minigames
)
def get_minigames_for_user(username: str, account_type: AccountType) -> Minigames:
    user_stats = Highscores(username, account_type)
    user_stats.set_user_highscores()
    return user_stats.minigames


@app.get("/highscores/bosses/{username}", tags=["Highscores"], response_model=Bosses)
def get_bosses_for_user(username: str, account_type: AccountType) -> Bosses:
    user_stats = Highscores(username, account_type)
    user_stats.set_user_highscores()
    return user_stats.bosses


@app.get("/highscores/usernames", tags=["Highscores"])
def get_unique_highscore_usernames(session: Session = Depends(get_db_session)):
    return get_unique_usernames(session)


@app.get("/highscores/all", tags=["Highscores"])
def get_unique_highscore_usernames(
    session: Session = Depends(get_db_session),
) -> Iterable[Highscores]:
    return get_all_username_data(session)


@app.post("/highscores/{username}", tags=["Highscores"])
def add_user_to_highscores(
    username: str, account_type: AccountType, session: Session = Depends(get_db_session)
) -> DBHighscores:
    user_stats = Highscores(username, account_type)
    user_stats.set_user_highscores()
    user_highscores = insert_user_highscores(
        session,
        username,
        account_type,
        user_stats.skills_summary,
        user_stats.skills,
        user_stats.minigames,
        user_stats.bosses,
    )
    return user_highscores


@app.put("/highscores/{username}", tags=["Highscores"])
def append_to_user_highscores(
    username: str, account_type: AccountType, session: Session = Depends(get_db_session)
) -> DBHighscores:
    user_stats = Highscores(username, account_type)
    user_stats.set_user_highscores()
    user_highscores = append_user_highscores(
        session,
        username,
        account_type,
        user_stats.skills_summary,
        user_stats.skills,
        user_stats.minigames,
        user_stats.bosses,
    )
    return user_highscores
