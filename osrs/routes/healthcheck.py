from osrs.app import app


@app.get("/healthcheck", tags=["Healthcheck"])
def healthcheck():
    return "ok"
