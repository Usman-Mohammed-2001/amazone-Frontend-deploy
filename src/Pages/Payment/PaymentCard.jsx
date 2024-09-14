
import React, { useContext, useState } from 'react';
import Layout from '../../Components/LayOut/Layout';
import classes from "./Payment.module.css";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";







// Component definition starts here
function PaymentCard() {
  // State and context usage
  const [{ user, basket}, dispatch] = useContext(DataContext);
  
  // Calculations and states
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();


//Handle card elements changes
const handleChange = (e)=>{
  e?.error?.message? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);







// **************************************************


try {
  setProcessing(true);

  // Step 1: Get client secret from backend
  const response = await axiosInstance({
         method: "POST",
         url: `/payment/create?total=${total * 100}`,
  });
  const clientSecret = response.data?.clientSecret;




  // Step 2: Confirm the payment with Stripe
  const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
    },
  });

  if (error) {
    setCardError(error.message);
    setProcessing(false);
    return;
  }

  // Step 3: Save order to Firestore and clear basket
  await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
    basket: basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created,
  });

      // Empty the basket
      dispatch({ type: Type.EMPTY_BASKET });


  setProcessing(false);
  navigate("/orders", { state: { msg: "You have placed a new order" } });
} catch (error) {
  console.error(error);
  setCardError("An error occurred during payment.");
  setProcessing(false);
}
};


// *********************************************************
  return (
    <Layout>
      {/* Header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/* Payment method */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* Product Review */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map(item => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* Card Form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              
             {/* ************form start****************************** */}
              <form onSubmit={handlePayment}>
                {cardError && (<small style={{ color: "red" }}>{cardError}</small>)}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p><CurrencyFormat amount={total} />
                    </span>
                  </div>
                 {/* button  area start */}
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : "Pay Now"}
                  </button>
                   {/* button  area end */}
                   
                </div>
              </form>
              {/* ****************form end************************** */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Export the component
export default PaymentCard;

