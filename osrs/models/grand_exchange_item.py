from dataclasses import dataclass
from typing import Optional


@dataclass
class GrandExchangeItem:
    """Class for keeping track of when grand exchange item"""

    item_id: int
    icon: str
    icon_large: str
    item_type: str
    type_icon: str
    name: str
    description: str
    current_price: str
    today_trend_price: str
    members: str
    day30_change: Optional[str] = None
    day90_change: Optional[str] = None
    day180_change: Optional[str] = None
