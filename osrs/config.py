import os


ENV = os.environ.get("ENV", "local")

CONFIG = {
    "local": {
        "HIGHSCORE_ROWS": 88,
        "API_URL": "http://localhost:8000",
        "DB_URI": "postgresql+psycopg2://postgres:postgres@postgres:5432/postgres",
    },
    "prod": {
        "HIGHSCORE_ROWS": 88,
        "API_URL": "https://osrs-progress-tracker.fly.dev",
    },
}
