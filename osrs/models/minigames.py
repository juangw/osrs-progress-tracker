from dataclasses import dataclass, field
from typing import Mapping


@dataclass
class Minigames:
    """Class for keeping track of minigame stats"""

    league_points: Mapping[str, str] = field(default_factory=dict)
    bounty_hunter_v2: Mapping[str, str] = field(default_factory=dict)
    bounty_hunter_rogue_v2: Mapping[str, str] = field(default_factory=dict)
    bounty_hunter: Mapping[str, str] = field(default_factory=dict)
    bounty_hunter_rogue: Mapping[str, str] = field(default_factory=dict)
    all_clue_scrolls: Mapping[str, str] = field(default_factory=dict)
    beginner_clue_scrolls: Mapping[str, str] = field(default_factory=dict)
    easy_clue_scrolls: Mapping[str, str] = field(default_factory=dict)
    medium_clue_scrolls: Mapping[str, str] = field(default_factory=dict)
    hard_clue_scrolls: Mapping[str, str] = field(default_factory=dict)
    elite_clue_scrolls: Mapping[str, str] = field(default_factory=dict)
    master_clue_scrolls: Mapping[str, str] = field(default_factory=dict)
    last_man_standing: Mapping[str, str] = field(default_factory=dict)
    pvp_arena: Mapping[str, str] = field(default_factory=dict)
    soul_wars: Mapping[str, str] = field(default_factory=dict)
    guardians_of_the_rift: Mapping[str, str] = field(default_factory=dict)

    def to_json(self):
        return self.__dict__
