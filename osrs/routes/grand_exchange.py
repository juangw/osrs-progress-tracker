from osrs.app import app
from osrs.controllers.grand_exchange import GrandExchange
from osrs.models.grand_exchange_last_update import GrandExchangeLastUpdated
from osrs.models.grand_exchange_item import GrandExchangeItem
from osrs.models.grand_exchange_graph import GrandExchangeItemGraph

from typing import List


@app.get("/grand_exchange/last_updated", tags=["GrandExchange"], response_model=GrandExchangeLastUpdated)
def get_ge_last_updated():
    ge = GrandExchange()
    return ge.get_last_updated()


@app.get("/grand_exchange/item_search", tags=["GrandExchange"], response_model=GrandExchangeItem)
def get_get_item_search(category: int, alpha: str, page: int):
    ge = GrandExchange()
    return ge.get_item_search(category, alpha, page)


@app.get("/grand_exchange/item_detail/{item_id}", tags=["GrandExchange"])
def get_ge_item_detail(item_id: int):
    ge = GrandExchange()
    return ge.get_item_detail(item_id)


@app.get("/grand_exchange/item_graph/{item_id}", tags=["GrandExchange"], response_model=GrandExchangeItemGraph)
def get_get_item_graph(item_id: int):
    ge = GrandExchange()
    return ge.get_item_graph(item_id)
