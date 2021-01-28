from fastapi import FastAPI

app = FastAPI()

from osrs.routes.healthcheck import *
from osrs.routes.highscores import *
