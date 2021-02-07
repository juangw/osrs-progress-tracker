export async function getHistoricalHighscoresForUser(username: string) {
    const environment = process.env.NODE_ENV || "development";
    let baseUrl;
    if (environment === "development") {
        baseUrl = "http://localhost:8000/highscores/historical";
    } else {
        baseUrl = "https://osrs-progress-tracker.herokuapp.com/highscores/historical";
    }
    const response = await fetch(
        `${baseUrl}/${encodeURIComponent(username)}`
    );

    const data = await response.json();
    return data;
}

export async function postHighscoresForUser(username: string) {
    const environment = process.env.NODE_ENV || "development";
    let baseUrl;
    if (environment === "development") {
        baseUrl = "http://localhost:8000/highscores";
    } else {
        baseUrl = "https://osrs-progress-tracker.herokuapp.com/highscores";
    }

    let data;
    const accountTypes = ["normal", "ironman", "hardcore_ironman", "ultimate"];
    for (const accountType of accountTypes) {
        try {
            const response = await fetch(
                `${baseUrl}/${encodeURIComponent(username)}?account_type=${accountType}`, {method: "POST"}
            );
            data = await response.json();
            break;
        } catch (e) {
            // only re-throw error if its the last accountType
            if (accountTypes.indexOf(accountType) === accountTypes.length) {
                throw e;
            }
        }
    }

    return data;
}