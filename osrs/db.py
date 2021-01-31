from osrs.models.skills import Skills
from osrs.models.skills_summary import SkillsSummary
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.enums import AccountType

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
    skills_summary = Column(JSONB, nullable=False)
    skills = Column(JSONB, nullable=False)
    minigames = Column(JSONB, nullable=False)
    bosses = Column(JSONB, nullable=False)
    created_date = Column(DateTime, server_default=func.now())

    def from_data(
        self,
        username: str,
        account_type: AccountType,
        skills_summary: SkillsSummary,
        skills: Skills,
        minigames: Minigames,
        bosses: Bosses,
    ):
        self.username = username
        self.account_type = account_type.value
        self.skills_summary = skills_summary.to_json()
        self.skills = skills.to_json()
        self.minigames = minigames.to_json()
        self.bosses = bosses.to_json()


def init_db():
    Base.metadata.create_all(engine)


def get_db_session():
    db = session
    try:
        yield db
    finally:
        db.close()
