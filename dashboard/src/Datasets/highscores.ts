export async function getHistoricalHighscoresForUser(username: string) {
    const environment = process.env.NODE_ENV || "development";
    let response;
    if (environment === "development") {
        response = await fetch(
            `http://localhost:8000/highscores/historical/${encodeURIComponent(username)}`
        );
    } else {
        response = await fetch(
            `https://osrs-progress-tracker.herokuapp.com/highscores/historical/${encodeURIComponent(username)}`
        );
    }

    const data = await response.json();
    return data;
}