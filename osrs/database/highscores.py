from osrs.db import Highscores
from osrs.models.skills import Skills
from osrs.models.skills_summary import SkillsSummary
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.enums import AccountType

from sqlalchemy.orm import Session
from typing import Mapping, Any, Iterable


def insert_user_highscores(
    session: Session,
    username: str,
    account_type: AccountType,
    skills_summary: SkillsSummary,
    skills: Skills,
    minigames: Minigames,
    bosses: Bosses,
) -> Highscores:
    user_highscores = Highscores()
    user_highscores.from_data(
        username, account_type, skills_summary, skills, minigames, bosses
    )
    session.add(user_highscores)
    session.commit()
    session.refresh(user_highscores)
    return user_highscores


def get_unique_usernames(session: Session,) -> Iterable[Mapping[str, Any]]:
    users_highscores = session.query(Highscores).distinct(Highscores.username).all()
    return [
        {"username": user.username, "account_type": user.account_type}
        for user in users_highscores
    ]


def get_all_username_data(session: Session,) -> Iterable[Mapping[str, Any]]:
    return session.query(Highscores).all()
