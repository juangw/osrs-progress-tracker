from osrs.models.skills import Skills
from osrs.models.skills_summary import SkillsSummary
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.enums import AccountType
from osrs.config import CONFIG, ENV

from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import Column, DateTime, String, Integer, func
from sqlalchemy.dialects.sqlite import JSON

import sqlalchemy
import os

DB_URI = CONFIG[ENV].get("DB_URI")
URL = os.environ.get("DATABASE_URL", DB_URI)

engine = sqlalchemy.create_engine(URL, pool_pre_ping=True)
Base = declarative_base()
session_factory = sessionmaker(bind=engine)
session = scoped_session(session_factory)


class Highscores(Base):
    __tablename__ = "highscores"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(256), nullable=False)
    account_type = Column(String(256), nullable=False)
    skills_summary = Column(MutableDict.as_mutable(JSON), nullable=False)
    skills = Column(MutableDict.as_mutable(JSON), nullable=False)
    minigames = Column(MutableDict.as_mutable(JSON), nullable=False)
    bosses = Column(MutableDict.as_mutable(JSON), nullable=False)
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
        self.skills_summary = skills_summary.to_json()
        self.skills = skills.to_json()
        self.minigames = minigames.to_json()
        self.bosses = bosses.to_json()


def init_db():
    Base.metadata.create_all(engine)
    print("Database created")


def get_db_session():
    db = session
    try:
        yield db
    finally:
        db.close()
