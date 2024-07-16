import { Router } from "express";
import { app } from "..";

const payment = Router()

const stripe = require('stripe')('sk_test_51Oqp3hD15GX4aPwwAjHvwgJYoOxGqolZ0vHb3LMuUXhigVAKgFrSxUlmHRvC9lqpSxHlZuKbRhSKfGSICnclsLy200iOnL31mT');

payment.post('/create-subscription', async (req, res) => {
  const { customerId, priceId } = req.body;

  try {
    const subscription = await stripe.subscriptions.create({
      customer: "cus_QToGTZgfkaIuNI",
      items: [{ price:"price_1PcqipD15GX4aPwwKJeQhtZf" }],
      // payment_behavior: 'pending_if_incomplet',
      expand: ['latest_invoice.payment_intent'],
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: 'any',
          },
        },
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
    });

    console.log(subscription);
        res.send({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      // subscriptionId: subscription.id,
    });
  } catch (error) { 
    res.status(400).send({ error: { message: error.message } });
  }
});
export default payment;