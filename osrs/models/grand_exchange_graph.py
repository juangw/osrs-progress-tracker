from dataclasses import dataclass
from typing import Mapping

@dataclass
class GrandExchangeItemGraph:
    """Class for keeping track of grand exchange graph for item"""
    daily: Mapping[str, int]
    average: Mapping[str, int]
