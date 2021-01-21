from dataclasses import dataclass

@dataclass
class Minigames:
    """Class for keeping track of minigame stats"""
    league_points: int
    bounty_hunter: int
    bounty_hunter_rogue: int
    all_clue_scrolls: int
    beginner_clue_scrolls: int
    easy_clue_scrolls: int
    medium_clue_scrolls: int
    hard_clue_scrolls: int
    elite_clue_scrolls: int
    master_clue_scrolls: int
    last_man_standing: int
