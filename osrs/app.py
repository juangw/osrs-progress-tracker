from fastapi import FastAPI

import os

app = FastAPI()

from osrs.routes.healthcheck import *
from osrs.routes.highscores import *
from osrs.routes.grand_exchange import *

PORT = int(os.environ.get("PORT", 8000))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)