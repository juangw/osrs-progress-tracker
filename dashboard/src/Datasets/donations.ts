const environment = process.env.NODE_ENV || "development";

export async function getDonationIntent(amount: number, currency: string) {
    let baseUrl;
    if (environment === "development") {
        baseUrl = "http://localhost:8000/donate_intent";
    } else {
        baseUrl = "https://osrs-progress-tracker.herokuapp.com/donate_intent";
    }

    const response = await fetch(`${baseUrl}?amount=${amount}&currency=${currency}`);
    return response.json();
}
