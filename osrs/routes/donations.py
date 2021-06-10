from osrs.app import app
import stripe
import os

stripe.api_key = os.environ.get("STRIPE_API_KEY")


@app.get(
    "/donate_intent", tags=["Donate"],
)
def donate_intent(amount: int, currency: str):
    return stripe.PaymentIntent.create(
        amount=amount, currency=currency, payment_method_types=["card"],
    )
