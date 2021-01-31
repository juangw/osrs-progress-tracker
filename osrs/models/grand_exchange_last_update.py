from dataclasses import dataclass
from typing import Mapping


@dataclass
class GrandExchangeLastUpdated:
    """Class for keeping track of when grand exchange last updated"""

    last_config_update_rundeday: str
