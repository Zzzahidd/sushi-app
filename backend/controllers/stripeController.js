const stripe = require("../config/stripe");

exports.createPaymentIntent =
  async (req, res) => {
    try {
      const paymentIntent =
        await stripe.paymentIntents.create({
          amount: req.body.amount * 100,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });

      res.json({
        clientSecret:
          paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };