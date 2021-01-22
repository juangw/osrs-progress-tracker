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
