# osrs-progress-tracker
This package is intended to allow users to track their osrs experience progress. It is technically a wrapper of the official Runescape API [here](https://runescape.wiki/w/Application_programming_interface).

You can view the Swagger Doc for the API here: https://osrs-progress-tracker-ui.onrender.com/api/docs

You can view the UI here: https://osrs-progress-tracker-ui.onrender.com

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
uvicorn osrs.app:app --reload --host=0.0.0.0 --port=8000
python -m debugpy --wait-for-client --listen 0.0.0.0:5678 -m uvicorn --reload --host 0.0.0.0 --port 8000 osrs.app:app
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

Or with docker-compose
```
docker compose -f docker-compose.local.yml build
docker compose -f docker-compose.local.yml up -d
docker compose exec osrs-progress-tracker-backend-app bash
docker compose exec osrs-progress-tracker-frontend-app bash
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


Debugging
1. Grab docker container's IP address for osrs-progress-tracker-backend-app with `docker inspect <CID>`
2. Put as host in your debug json, and put `/usr/src/app/` as the remote path
