from osrs.app import app

@app.get("/", tags=["Healthcheck"])
def healthcheck():
    return "ok"