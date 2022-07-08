import moment from "moment";

const environment = process.env.NODE_ENV || "development";

interface HistoricalHighscoresParams {
    username: string;
    startDate?: moment.Moment;
    returnOnly?: string;
    pagination?: [number, number];
    sortBy?: [string];
}

export async function getHistoricalHighscoresForUser({
    username,
    startDate,
    returnOnly,
    pagination,
    sortBy
}: HistoricalHighscoresParams) {
    let baseUrl;
    let params = [];
    if (environment === "development") {
        baseUrl = "https://osrs-progress-tracker.herokuapp.com/highscores/historical";
        // http://localhost:8000/highscores/historical
    } else {
        baseUrl = "https://osrs-progress-tracker.herokuapp.com/highscores/historical";
    }

    if (typeof startDate !== "undefined") {
        params.push(`start_date=${startDate.format("MM-DD-YYYY")}`);
    }
    if (typeof returnOnly !== "undefined") {
        params.push(`only_return=${returnOnly}`);
    }
    if (typeof pagination !== "undefined") {
        params.push(`page=${pagination[0]}&page_size=${pagination[1]}`);
    }
    if (typeof sortBy !== "undefined") {
        params.push(`sort_by=${sortBy.join(",")}`);
    }
    const response = await fetch(
        `${baseUrl}/${encodeURIComponent(username)}${params.length > 0 ? `?${params.join("&")}` : ""}`
    );

    const data = await response.json();
    return data;
}

export async function postHighscoresForUser(username: string) {
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
            if (data.status_code === 404) { throw new Error("User not found"); }
            break;
        } catch (e) {
            // only re-throw error if its the last accountType
            if (accountTypes.indexOf(accountType) === accountTypes.length - 1) {
                data = "Failed";
            }
        }
    }
    return data;
}