export async function getHistoricalHighscoresForUser(username: string) {
    const response = await fetch(
        `http://localhost:8000/highscores/historical/${encodeURIComponent(username)}`
    );
    const data = await response.json();
    return data;
}