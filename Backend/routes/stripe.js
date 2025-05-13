const express = require('express');
const Stripe = require('stripe');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

router.post('/create-intent', async (req, res) => {
  const { amount, currency = 'inr' } = req.body; // Default to INR

  try {
    // For INR, we don't multiply by 100 since Stripe expects paise
    const stripeAmount = currency === 'inr' ? Math.round(Number(amount)) : Math.round(Number(amount) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeAmount,
      currency: currency, // Now dynamic
      payment_method_types: ['card'],
      description: 'Ride Payment'
    });

    res.status(200).json({ 
      clientSecret: paymentIntent.client_secret,
      currency: currency
    });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(400).json({ 
      error: error.message,
      code: error.code 
    });
  }
});

module.exports = router;