from osrs.db import Highscores
from osrs.models.skills import Skills
from osrs.models.skills_summary import SkillsSummary
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.enums import AccountType, HighscoresDataTypes
from osrs.utils.pagination import paginate

from sqlalchemy.orm import Session, load_only
from sqlalchemy import func, text
from typing import Mapping, Any, Iterable, Optional, List

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


def get_unique_usernames(session: Session) -> Iterable[Mapping[str, Any]]:
    users_highscores = session.query(Highscores).distinct(Highscores.username).all()
    return [
        {"username": user.username, "account_type": user.account_type}
        for user in users_highscores
    ]


def get_all_username_highscores(session: Session) -> Iterable[Mapping[str, Any]]:
    return session.query(Highscores).all()


def get_all_highscores_for_user(
    session: Session,
    username: str,
    start_date: Optional[str],
    only_return: Optional[HighscoresDataTypes],
    page_size: Optional[int],
    page: Optional[int],
    sort_by: Optional[str],
) -> Iterable[Mapping[str, Any]]:
    query = session.query(Highscores).filter(Highscores.username == username)

    # Add query for start_date
    if start_date:
        query = query.filter(Highscores.created_date >= func.date(start_date))

    # Only return certain entities if requested in `only_return`
    if only_return:
        query = query.options(load_only(*[only_return.value, "created_date"]))

    # Apply sort order
    if sort_by:
        sort_bys = sort_by.split(",")
        for sort in sort_bys:
            column, sort_order = sort_by.split(":", 1)
            query = query.order_by(text(f"{column} {sort_order}"))

    query_result = paginate(
        query=query, page=page, page_size=page_size, error_out=False
    )
    result = dict(
        data=query_result.items,
        total=query_result.total,
        current_page=query_result.page,
        page_size=query_result.page_size,
    )

    return result
