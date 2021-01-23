from osrs.controllers.highscores import Highscores
from osrs.controllers.grand_exchange import GrandExchange
from osrs.enums import AccountType, GrandExchangeEndpoint


osrs = Highscores("Afk N Scape", AccountType.NORMAL)
osrs.set_user_highscores()
print(osrs.skills_summary)
print(osrs.skills)
print(osrs.minigames)
print(osrs.bosses)

ge = GrandExchange()
print(ge.get_last_updated())
print(ge.get_item_search(category="1", alpha="a", page="1"))
print(ge.get_item_detail(item_id="50"))
print(ge.get_item_graph(item_id="50"))