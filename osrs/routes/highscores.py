from osrs.app import app
from osrs.controllers.highscores import Highscores
from osrs.enums import AccountType, HighscoresDataTypes
from osrs.models.skills import Skills
from osrs.models.skills_summary import SkillsSummary
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.database.highscores import (
    insert_user_highscores,
    get_unique_usernames,
    get_all_username_highscores,
    get_all_highscores_for_user,
)
from osrs.db import get_db_session, Highscores as DBHighscores
from osrs.exceptions import NoUserError

from sqlalchemy.orm import Session
from typing import Iterable, Optional
from fastapi import Depends, HTTPException


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


@app.get("/highscores/historical", tags=["Highscores"])
def get_all_highscores(
    session: Session = Depends(get_db_session),
) -> Iterable[Highscores]:
    return get_all_username_highscores(session)


@app.get("/highscores/historical/{username}", tags=["Highscores"])
def get_all_highscores_for_username(
    username: str,
    start_date: Optional[str] = None,
    only_return: Optional[HighscoresDataTypes] = None,
    session: Session = Depends(get_db_session),
) -> Iterable[Highscores]:
    return get_all_highscores_for_user(session, username, start_date, only_return)


@app.post("/highscores/{username}", tags=["Highscores"])
def add_user_to_highscores(
    username: str, account_type: AccountType, session: Session = Depends(get_db_session)
) -> DBHighscores:
    user_stats = Highscores(username, account_type)
    try:
        user_stats.set_user_highscores()
    except NoUserError as e:
        return HTTPException(status_code=404, detail=f"Username not found: {e}")
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
