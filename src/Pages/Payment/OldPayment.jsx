import React, { useContext, useState } from "react";
import Layout from "../../Components/LayOut/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  //const  [{basket}] = useContext(DataContext)

  // total itemm
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // total Price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // error message
  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  // form related function
  const handlePayment = async (e) => {
    e.preventDefault();









    // *******************************************************************
    try {
      setProcessing(true);
      //  step 1 backend || functions -----> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // step 2  client side (client side confirmation)
      //const {confirmation} = await stripe.conformCardPayment(   change after test conformation
      const { paymentIntent } = await stripe.conformCardPayment(clientSecret, {
        payment_methods: {
          card: elements.getElement(CardElement),
        },
      });
      //console.log(confirmation);
      //console.log(paymentIntent);

      //step 3  after the confirmation --< firestore database  save , clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
// **********************************************************************/













  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items{" "}
      </div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          {/* <div>{user?.email}</div> */}
          <div>
            {/* <div>jemalmoh98@gmail.com</div> */}
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3> Review items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* card form*/}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>

          <div className={classes.payment_card_container}>
            {/* form div */}
            <div className={classes.payment_details}>
              {/* ***************************************************** */}
              <form onsubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* card Element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Totoal Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                {/* button  area start */}
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                     {/* button  area end */}
                </div>
              </form>
              {/* ***************************************************** */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
