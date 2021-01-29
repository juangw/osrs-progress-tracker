# osrs-progress-tracker
This package is intended to allow users to track their osrs experience progress. It is technically a wrapper of the official Runescape API [here](https://runescape.wiki/w/Application_programming_interface).

You can view the Swagger Doc for the API here: https://osrs-progress-tracker.herokuapp.com/docs#/

# Setting up 
You can setup the repo for development with a virtual environment
```bash
pip install virtualenv
python3 -m venv env
source env/bin/activate
```

Install the requirements
```bash
pip3 install -r requirements.txt
```

Start the API locally (remove the --reload for non development)
```bash
uvicorn osrs.app:app --reload
```

Or you can just access the data through the module itself like the example below
```python
from osrs.controllers.highscores import Highscores
from osrs.controllers.grand_exchange import GrandExchange
from osrs.enums import AccountType, GrandExchangeEndpoint

osrs = Highscores("Zezima", AccountType.NORMAL)
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
```

# Setting up Heroku Deploy
1. https://devcenter.heroku.com/articles/heroku-cli#download-and-install
2. Run these commands to setup:
```bash
heroku create
git remote -v
heroku git:remote -a <NAME_OF_APP_ON_HEROKU>
heroku stack:set container
```
3. Run this command to deploy:
```bash
git push heroku master
```