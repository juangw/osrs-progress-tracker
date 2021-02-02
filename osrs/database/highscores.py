from osrs.db import Highscores
from osrs.models.skills import Skills
from osrs.models.skills_summary import SkillsSummary
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.enums import AccountType

from sqlalchemy.orm import Session
from typing import Mapping, Any, Iterable

import time


def insert_user_highscores(
    session: Session,
    username: str,
    account_type: AccountType,
    skills_summary: SkillsSummary,
    skills: Skills,
    minigames: Minigames,
    bosses: Bosses,
) -> Highscores:
    current_time = int(time.time())
    user_highscores = Highscores()
    user_highscores.from_data(
        username, account_type, current_time, skills_summary, skills, minigames, bosses
    )
    session.add(user_highscores)
    session.commit()
    session.refresh(user_highscores)
    return user_highscores


def append_user_highscores(
    session: Session,
    username: str,
    account_type: AccountType,
    skills_summary: SkillsSummary,
    skills: Skills,
    minigames: Minigames,
    bosses: Bosses,
) -> Highscores:
    current_time = int(time.time())
    user_highscores = session.query(Highscores).filter(Highscores.username == username).one()

    # 1 year retention of historical data in JSONB columns
    if len(user_highscores.skills_summary) > 365:
        removal_key = sorted(user_highscores.skills_summary)[0]
        user_highscores.skills_summary.pop(removal_key, None)
        user_highscores.skills.pop(removal_key, None)
        user_highscores.minigames.pop(removal_key, None)
        user_highscores.bosses.pop(removal_key, None)

    user_highscores.skills_summary[current_time] = skills_summary.__dict__
    user_highscores.skills[current_time] = skills.__dict__
    user_highscores.minigames[current_time] = minigames.__dict__
    user_highscores.bosses[current_time] = bosses.__dict__
    session.commit()
    session.refresh(user_highscores)
    return user_highscores


def get_unique_usernames(session: Session) -> Iterable[Mapping[str, Any]]:
    users_highscores = session.query(Highscores).distinct(Highscores.username).all()
    return [
        {"username": user.username, "account_type": user.account_type}
        for user in users_highscores
    ]


def get_all_username_highscores(session: Session) -> Iterable[Mapping[str, Any]]:
    return session.query(Highscores).all()


def get_all_highscores_for_user(session: Session, username: str) -> Mapping[str, Any]:
    return session.query(Highscores).filter(Highscores.username == username).one()
