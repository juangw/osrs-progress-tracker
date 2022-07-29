from enum import Enum, unique
from typing import Optional


@unique
class AccountType(Enum):
    NORMAL = "normal"
    IRONMAN = "ironman"
    HARDCORE_IRONMAN = "hardcore_ironman"
    ULTIMATE_IRONMAN = "ultimate"
    DEADMAN = "deadman"
    SEASONAL = "seasonals"

    @classmethod
    def to_highscore_url(cls, account_type: str) -> Optional[str]:
        url_mapping = {
            cls.NORMAL: "m=hiscore_oldschool/index_lite.ws",
            cls.IRONMAN: "m=hiscore_oldschool_ironman/index_lite.ws",
            cls.HARDCORE_IRONMAN: "m=hiscore_oldschool_hardcore_ironman/index_lite.ws",
            cls.ULTIMATE_IRONMAN: "m=hiscore_oldschool_ultimate/index_lite.ws",
            cls.DEADMAN: "m=hiscore_oldschool_deadman/index_lite.ws",
            cls.SEASONAL: "m=hiscore_oldschool_seasonal/index_lite.ws",
        }
        return url_mapping.get(account_type)


@unique
class GrandExchangeEndpoint(Enum):
    INFO = "info"
    ITEMS = "items"
    DETAIL = "detail"
    GRAPH = "graph"

    @classmethod
    def to_url(cls, endpoint_type: str) -> Optional[str]:
        url_mapping = {
            cls.INFO: "m=itemdb_rs/api/info.json",
            cls.ITEMS: "m=itemdb_rs/api/catalogue/items.json",
            cls.DETAIL: "m=itemdb_rs/api/catalogue/detail.json",
            cls.GRAPH: "m=itemdb_rs/api/graph",
        }
        return url_mapping.get(endpoint_type)


@unique
class HighscoresDataTypes(Enum):
    SKILLS_SUMMARY = "skills_summary"
    SKILLS = "skills"
    MINIGAMES = "minigames"
    BOSSES = "bosses"
