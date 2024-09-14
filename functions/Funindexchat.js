// Your Firebase Cloud Function code looks like it's aimed at handling Stripe payments using Express. However, I noticed a couple of issues that need addressing:

// 1. **Environment Variables**: When initializing Stripe, you should use `process.env.STRIPE_KEY` directly, not the string `"process.env.STRIPE_KEY"`. This will ensure that the key is correctly retrieved from the environment.

// 2. **Typo in `client_secret`**: In the response, you have `client_Secret`, but the correct field is `client_secret`.

// 3. **Parsing `total`**: You are using `req.query.total` for getting the `total` value, which is typically used with query parameters in GET requests. Since your route is a POST request, you might want to use `req.body.total` instead.

// 4. **Error Handling**: Add error handling for the Stripe API call to handle potential issues gracefully.

// Here is the revised code with these fixes:


const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_KEY); // Use the environment variable directly

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Success!",
    });
});

app.post("/payment/create", async (req, res) => {
    const total = parseInt(req.body.total); // Use req.body instead of req.query

    if (total > 0) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "usd",
            });

            res.status(201).json({
                clientSecret: paymentIntent.client_secret, // Correct field name
            });
        } catch (error) {
            logger.error("Stripe error", error);
            res.status(500).json({
                message: "An error occurred while creating the payment intent.",
            });
        }
    } else {
        res.status(400).json({
            message: "Total must be greater than 0", // Changed status to 400 for client error
        });
    }
});

exports.api = onRequest(app);


// ### Summary of Changes:
// 1. Fixed `stripe` initialization with `process.env.STRIPE_KEY`.
// 2. Corrected `client_Secret` to `client_secret`.
// 3. Changed `req.query.total` to `req.body.total` for POST requests.
// 4. Added error handling for the Stripe API call.
// 5. Updated the status code for client errors to `400` in case of invalid total value.

// This should make your function more robust and handle payment creation more reliably.