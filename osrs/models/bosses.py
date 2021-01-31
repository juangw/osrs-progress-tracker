from dataclasses import dataclass, field
from typing import Optional, Mapping


@dataclass
class Bosses:
    """Class for keeping track of boss stats"""

    abyssal_sire: Mapping[str, str] = field(default_factory=dict)
    alchemical_hydra: Mapping[str, str] = field(default_factory=dict)
    barrows_chests: Mapping[str, str] = field(default_factory=dict)
    bryophyta: Mapping[str, str] = field(default_factory=dict)
    callisto: Mapping[str, str] = field(default_factory=dict)
    cerberus: Mapping[str, str] = field(default_factory=dict)
    chambers_of_eric: Mapping[str, str] = field(default_factory=dict)
    chambers_of_xeric_challenge_mode: Mapping[str, str] = field(default_factory=dict)
    chaos_elemental: Mapping[str, str] = field(default_factory=dict)
    chaos_fanatic: Mapping[str, str] = field(default_factory=dict)
    commander_zilyana: Mapping[str, str] = field(default_factory=dict)
    corporeal_beast: Mapping[str, str] = field(default_factory=dict)
    crazy_archaeologist: Mapping[str, str] = field(default_factory=dict)
    dagannoth_prime: Mapping[str, str] = field(default_factory=dict)
    dagannoth_rex: Mapping[str, str] = field(default_factory=dict)
    dagannoth_supreme: Mapping[str, str] = field(default_factory=dict)
    deranged_archaeologist: Mapping[str, str] = field(default_factory=dict)
    general_graardor: Mapping[str, str] = field(default_factory=dict)
    giant_mole: Mapping[str, str] = field(default_factory=dict)
    grotesque_guardians: Mapping[str, str] = field(default_factory=dict)
    hespori: Mapping[str, str] = field(default_factory=dict)
    kalphite_queen: Mapping[str, str] = field(default_factory=dict)
    king_black_dragon: Mapping[str, str] = field(default_factory=dict)
    kraken: Mapping[str, str] = field(default_factory=dict)
    kreearra: Mapping[str, str] = field(default_factory=dict)
    kril_tsutsaroth: Mapping[str, str] = field(default_factory=dict)
    mimic: Mapping[str, str] = field(default_factory=dict)
    nightmare: Mapping[str, str] = field(default_factory=dict)
    obor: Mapping[str, str] = field(default_factory=dict)
    sarachnis: Mapping[str, str] = field(default_factory=dict)
    scorpia: Mapping[str, str] = field(default_factory=dict)
    skotizo: Mapping[str, str] = field(default_factory=dict)
    the_guantlet: Mapping[str, str] = field(default_factory=dict)
    the_corrupted_guantlet: Mapping[str, str] = field(default_factory=dict)
    theatre_of_blood: Mapping[str, str] = field(default_factory=dict)
    thermonuclear_smoke_devil: Mapping[str, str] = field(default_factory=dict)
    tzkal_zuk: Mapping[str, str] = field(default_factory=dict)
    tztok_jad: Mapping[str, str] = field(default_factory=dict)
    venenatis: Mapping[str, str] = field(default_factory=dict)
    vetion: Mapping[str, str] = field(default_factory=dict)
    vorkath: Mapping[str, str] = field(default_factory=dict)
    wintertodt: Mapping[str, str] = field(default_factory=dict)
    zalcano: Mapping[str, str] = field(default_factory=dict)
    zulrah: Mapping[str, str] = field(default_factory=dict)

    def to_json(self):
        return self.__dict__
