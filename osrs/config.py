import os


ENV = os.environ.get("ENV", "local")

CONFIG = {
    "local": {
        "HIGHSCORE_ROWS": 80,
        "API_URL": "http://localhost:8000",
        "DB_NAME": "osrs_tracker",
    },
    "prod": {
        "HIGHSCORE_ROWS": 80,
        "API_URL": "https://osrs-progress-tracker.herokuapp.com",
        "DB_NAME": "osrs_tracker",
    },
}
