from dataclasses import dataclass
from typing import Optional, Mapping


@dataclass
class SkillsSummary:
    """Class for keeping track of summary skill stats"""

    ranking: Optional[str] = None
    total_levels: Optional[str] = None
    total_experience: Optional[str] = None

    def to_json(self):
        return self.__dict__
