from dataclasses import dataclass
from typing import Optional, Mapping

@dataclass
class Skills:
    """Class for keeping track of skill stats"""
    attack: Optional[Mapping[str, str]] = None
    defence: Optional[Mapping[str, str]] = None
    strength: Optional[Mapping[str, str]] = None
    hitpoints: Optional[Mapping[str, str]] = None
    ranged: Optional[Mapping[str, str]] = None
    prayer: Optional[Mapping[str, str]] = None
    magic: Optional[Mapping[str, str]] = None
    cooking: Optional[Mapping[str, str]] = None
    woodcutting: Optional[Mapping[str, str]] = None
    fletching: Optional[Mapping[str, str]] = None
    fishing: Optional[Mapping[str, str]] = None
    firemaking: Optional[Mapping[str, str]] = None
    crafting: Optional[Mapping[str, str]] = None
    smithing: Optional[Mapping[str, str]] = None
    mining: Optional[Mapping[str, str]] = None
    herblore: Optional[Mapping[str, str]] = None
    agility: Optional[Mapping[str, str]] = None
    thieving: Optional[Mapping[str, str]] = None
    slayer: Optional[Mapping[str, str]] = None
    farming: Optional[Mapping[str, str]] = None
    runecrafting: Optional[Mapping[str, str]] = None
    hunter: Optional[Mapping[str, str]] = None
    construction: Optional[Mapping[str, str]] = None
