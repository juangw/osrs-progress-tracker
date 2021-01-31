from dataclasses import dataclass, field
from typing import Mapping


@dataclass
class Skills:
    """Class for keeping track of skill stats"""

    attack: Mapping[str, str] = field(default_factory=dict)
    defence: Mapping[str, str] = field(default_factory=dict)
    strength: Mapping[str, str] = field(default_factory=dict)
    hitpoints: Mapping[str, str] = field(default_factory=dict)
    ranged: Mapping[str, str] = field(default_factory=dict)
    prayer: Mapping[str, str] = field(default_factory=dict)
    magic: Mapping[str, str] = field(default_factory=dict)
    cooking: Mapping[str, str] = field(default_factory=dict)
    woodcutting: Mapping[str, str] = field(default_factory=dict)
    fletching: Mapping[str, str] = field(default_factory=dict)
    fishing: Mapping[str, str] = field(default_factory=dict)
    firemaking: Mapping[str, str] = field(default_factory=dict)
    crafting: Mapping[str, str] = field(default_factory=dict)
    smithing: Mapping[str, str] = field(default_factory=dict)
    mining: Mapping[str, str] = field(default_factory=dict)
    herblore: Mapping[str, str] = field(default_factory=dict)
    agility: Mapping[str, str] = field(default_factory=dict)
    thieving: Mapping[str, str] = field(default_factory=dict)
    slayer: Mapping[str, str] = field(default_factory=dict)
    farming: Mapping[str, str] = field(default_factory=dict)
    runecrafting: Mapping[str, str] = field(default_factory=dict)
    hunter: Mapping[str, str] = field(default_factory=dict)
    construction: Mapping[str, str] = field(default_factory=dict)

    def to_json(self):
        return self.__dict__
