from osrs.app import app

@app.get("/healthcheck")
def healthcheck():
    return "ok"