from osrs.enums import GrandExchangeEndpoint
from osrs.models.grand_exchange_graph import GrandExchangeItemGraph
from osrs.models.grand_exchange_item import GrandExchangeItem
from osrs.models.grand_exchange_last_update import GrandExchangeLastUpdated
from osrs.exceptions import OutdatedError
from osrs.config import CONFIG

from typing import Optional, Mapping, Any, Union, List

import requests


class GrandExchange(object):
    def __init__(self):
        self.base_url = "http://services.runescape.com"

    def get_last_updated(self) -> GrandExchangeLastUpdated:
        grand_exchange_url = GrandExchangeEndpoint.to_url(GrandExchangeEndpoint.INFO)
        full_url = f"{self.base_url}/{grand_exchange_url}"
        response = requests.get(url=full_url)
        response.raise_for_status()
        return GrandExchangeLastUpdated(
            last_config_update_rundeday=response.json()["lastConfigUpdateRuneday"]
        )

    def get_item_search(
        self, category: int, alpha: str, page: int
    ) -> Mapping[str, Union[int, List[GrandExchangeItem]]]:
        grand_exchange_url = GrandExchangeEndpoint.to_url(GrandExchangeEndpoint.ITEMS)
        full_url = f"{self.base_url}/{grand_exchange_url}"
        response = requests.get(
            url=f"{full_url}",
            params={"category": category, "alpha": alpha, "page": page},
        )
        response.raise_for_status()
        return {
            "total_items": response.json()["total"],
            "items": [
                GrandExchangeItem(
                    item_id=item["id"],
                    icon=item["icon"],
                    icon_large=item["icon_large"],
                    item_type=item["type"],
                    type_icon=item["typeIcon"],
                    name=item["name"],
                    description=item["description"],
                    current_price=item["current"]["price"],
                    today_trend_price=item["today"]["price"],
                    members=item["members"],
                )
                for item in response.json()["items"]
            ],
        }

    def get_item_detail(self, item_id: int) -> GrandExchangeItem:
        grand_exchange_url = GrandExchangeEndpoint.to_url(GrandExchangeEndpoint.DETAIL)
        full_url = f"{self.base_url}/{grand_exchange_url}"
        response = requests.get(url=full_url, params={"item": item_id})
        response.raise_for_status()
        return GrandExchangeItem(
            item_id=response.json()["item"]["id"],
            icon=response.json()["item"]["icon"],
            icon_large=response.json()["item"]["icon_large"],
            item_type=response.json()["item"]["type"],
            type_icon=response.json()["item"]["typeIcon"],
            name=response.json()["item"]["name"],
            description=response.json()["item"]["description"],
            current_price=response.json()["item"]["current"]["price"],
            today_trend_price=response.json()["item"]["today"]["price"],
            members=response.json()["item"]["members"],
            day30_change=response.json()["item"]["day30"]["change"],
            day90_change=response.json()["item"]["day90"]["change"],
            day180_change=response.json()["item"]["day180"]["change"],
        )

    def get_item_graph(self, item_id: int) -> GrandExchangeItemGraph:
        grand_exchange_url = GrandExchangeEndpoint.to_url(GrandExchangeEndpoint.GRAPH)
        full_url = f"{self.base_url}/{grand_exchange_url}"
        response = requests.get(url=f"{full_url}/{item_id}.json")
        response.raise_for_status()
        return GrandExchangeItemGraph(
            daily=response.json()["daily"], average=response.json()["average"],
        )
