from osrs.models.skills import Skills
from osrs.models.skills_summary import SkillsSummary
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.enums import AccountType

from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB

from typing import Mapping, Any

import sqlalchemy
import os

URL = os.environ.get(
    "DATABASE_URL", "postgresql+psycopg2://admin:postgres@postgres:5432/postgres",
)
print("Connecting to postgres")

engine = sqlalchemy.create_engine(URL, client_encoding="utf8")
Base = declarative_base()
session_factory = sessionmaker(bind=engine)
session = scoped_session(session_factory)


class Highscores(Base):
    __tablename__ = "highscores"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, nullable=False)
    account_type = Column(String, nullable=False)
    skills_summary = Column(MutableDict.as_mutable(JSONB), nullable=False)
    skills = Column(MutableDict.as_mutable(JSONB), nullable=False)
    minigames = Column(MutableDict.as_mutable(JSONB), nullable=False)
    bosses = Column(JSONB, nullable=False)
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.now())
    created_date = Column(DateTime, server_default=func.now())

    def from_data(
        self,
        username: str,
        account_type: AccountType,
        current_time: int,
        skills_summary: SkillsSummary,
        skills: Skills,
        minigames: Minigames,
        bosses: Bosses,
    ):
        self.username = username
        self.account_type = account_type.value
        self.skills_summary = {current_time: skills_summary.to_json()}
        self.skills = {current_time: skills.to_json()}
        self.minigames = {current_time: minigames.to_json()}
        self.bosses = {current_time: bosses.to_json()}


def init_db():
    Base.metadata.create_all(engine)


def get_db_session():
    db = session
    try:
        yield db
    finally:
        db.close()
