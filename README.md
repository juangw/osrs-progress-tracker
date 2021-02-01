# osrs-progress-tracker
This package is intended to allow users to track their osrs experience progress. It is technically a wrapper of the official Runescape API [here](https://runescape.wiki/w/Application_programming_interface).

You can view the Swagger Doc for the API here: https://osrs-progress-tracker.herokuapp.com/docs#/

You can view the UI here: https://osrs-progress-tracker-ui.herokuapp.com

# Setting up with Virtual Environment
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

# Setting up with Docker
Build the image
```bash
# For backend
docker build -f Dockerfile -t <IMAGE_NAME> .
# For frontend
docker build -f Dockerfile.dashboards -t <IMAGE_NAME> .
```

Run the image
```bash
# For backend
docker run --rm -it -p 8000:8000 -v "$(pwd):/usr/src/app/" --network=host <IMAGE_NAME>

# For frontend
docker run --rm -it -p 3000:3000 -v "$(pwd):/usr/src/app/dashboard" --network=host <IMAGE_NAME>
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
