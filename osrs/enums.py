from enum import Enum, unique


@unique
class AccountType(Enum):
    NORMAL = "/m=hiscore_oldschool/index_lite.ws"
    IRONMAN = "/m=hiscore_oldschool_ironman/index_lite.ws"
    HARDCORE_IRONMAN = "/m=hiscore_oldschool_hardcore_ironman/index_lite.ws"
    ULTIMATE_IRONMAN = "/m=hiscore_oldschool_ultimate/index_lite.ws"
    DEADMAN = "/m=hiscore_oldschool_deadman/index_lite.ws"
    SEASONAL = "/m=hiscore_oldschool_seasonal/index_lite.ws"
