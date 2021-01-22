from osrs.controllers.osrs import Osrs
from osrs.enums import AccountType


osrs = Osrs("Afk N Scape", AccountType.NORMAL)
print(osrs.get_user_highscores()["Skills Summary"])
print(osrs.get_user_highscores()["Skills"])
print(osrs.get_user_highscores()["Minigames"])
print(osrs.get_user_highscores()["Bosses"])