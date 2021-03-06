from osrs.enums import AccountType
from osrs.models.skills_summary import SkillsSummary
from osrs.models.skills import Skills
from osrs.models.minigames import Minigames
from osrs.models.bosses import Bosses
from osrs.exceptions import OutdatedError, NoUserError
from osrs.config import CONFIG, ENV

from typing import Mapping, Union, Iterable

import requests


class Highscores(object):
    def __init__(self, username: str, account_type: AccountType):
        self.username = username
        self.account_type = account_type

        self.base_url = "http://services.runescape.com"

        self.skills_summary = SkillsSummary()
        self.skills = Skills()
        self.skills_len = len(self.skills.__dict__)
        self.minigames = Minigames()
        self.minigames_len = len(self.minigames.__dict__)
        self.bosses = Bosses()
        self.bosses_len = len(self.bosses.__dict__)

    def set_user_highscores(self) -> None:
        try:
            response = self._call_highscores_api()
        except Exception as e:
            raise NoUserError(f"No user by the name of: {self.username}")
        rows = response.strip().split("\n")
        row_count = CONFIG[ENV].get("HIGHSCORE_ROWS")
        if len(rows) != row_count:
            raise OutdatedError(
                f"Expected {row_count} but received {len(rows)} from highscores API"
            )

        self._set_summary_skills(rows[0].split(","))

        skills_end_index = self.skills_len + 1
        self._set_skills([row.split(",") for row in rows[1:skills_end_index]])

        minigames_end_index = skills_end_index + self.minigames_len
        self._set_minigames(
            [row.split(",") for row in rows[skills_end_index:minigames_end_index]]
        )

        bosses_end_index = minigames_end_index + self.bosses_len
        self._set_bosses(
            [row.split(",") for row in rows[minigames_end_index:bosses_end_index]]
        )

    def _set_summary_skills(self, skills_summary: Iterable[str]) -> None:
        (
            self.skills_summary.ranking,
            self.skills_summary.total_levels,
            self.skills_summary.total_experience,
        ) = skills_summary

    def _set_skills(self, skills: Iterable[Iterable[str]]) -> None:
        for index, attribute in enumerate(self.skills.__dict__):
            setattr(
                self.skills,
                attribute,
                {
                    "ranking": skills[index][0],
                    "level": skills[index][1],
                    "experience": skills[index][2],
                },
            )

    def _set_minigames(self, minigames: Iterable[Iterable[str]]) -> None:
        for index, attribute in enumerate(self.minigames.__dict__):
            setattr(
                self.minigames,
                attribute,
                {"ranking": minigames[index][0], "count": minigames[index][1],},
            )

    def _set_bosses(self, bosses: Iterable[Iterable[str]]) -> None:
        for index, attribute in enumerate(self.bosses.__dict__):
            setattr(
                self.bosses,
                attribute,
                {"ranking": bosses[index][0], "count": bosses[index][1],},
            )

    def _call_highscores_api(self) -> str:
        account_type_highscore_url = AccountType.to_highscore_url(self.account_type)
        full_url = f"{self.base_url}/{account_type_highscore_url}"
        response = requests.get(url=full_url, params={"player": self.username})
        response.raise_for_status()
        return response.text
