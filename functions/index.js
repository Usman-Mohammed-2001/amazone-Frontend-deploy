
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")("process.env.STRIPE_KEY");


const app =express()
app.use(cors({origin:true}));

app.use(express.json());

app.get("/" ,(req, res)=>{
    res.status(200).json({
        message: "Sucess !",
    });
});

app.post("/payment/create", async (req, res) =>{
    const total = parseInt(req.query.total);

    if(total > 0 ){
    //     console.log("Payment recieved ", total);
    //     res.send(total)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        }) 
    //    console.log(paymentIntent)

        // res.send(201).json(paymentIntent)
        res.status(201).json({
            clientSecret: paymentIntent.client_Secret,
        })

    }else{
        res.send(403).json({
            message: "total mustbe greater than  0"
        })
    }
})














exports.api=onRequest(app);
