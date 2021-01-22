from dataclasses import dataclass
from typing import Optional, Mapping

@dataclass
class Minigames:
    """Class for keeping track of minigame stats"""
    league_points: Optional[Mapping[str, str]] = None
    bounty_hunter: Optional[Mapping[str, str]] = None
    bounty_hunter_rogue: Optional[Mapping[str, str]] = None
    all_clue_scrolls: Optional[Mapping[str, str]] = None
    beginner_clue_scrolls: Optional[Mapping[str, str]] = None
    easy_clue_scrolls: Optional[Mapping[str, str]] = None
    medium_clue_scrolls: Optional[Mapping[str, str]] = None
    hard_clue_scrolls: Optional[Mapping[str, str]] = None
    elite_clue_scrolls: Optional[Mapping[str, str]] = None
    master_clue_scrolls: Optional[Mapping[str, str]] = None
    last_man_standing: Optional[Mapping[str, str]] = None
    soul_wars: Optional[Mapping[str, str]] = None
