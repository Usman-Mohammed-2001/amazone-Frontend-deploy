import React, { useContext, useState} from 'react';
import Layout from '../../Components/LayOut/Layout';
import classes from "./Payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import {ClipLoader} from "react-spinners";


function PaymentCard() {


 const  [{user, basket}] = useContext(DataContext);





//calculate total items and total price
 const totalItem = basket?.reduce((amount,item)=> item.amount +  amount ,0);
const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

const [cardError, setCardError] = useState(null);
const [processing, setProcessing] = useState(false);



const stripe = useStripe();
const elements = useElements();
// const navigate = useNavigate();



// Handle card elements changes
const handleChange = (e)=>{
 e?.error?.message? setCardError(e?.error?.message) : setCardError("");
 };




  // Handle payment submission
  //  const  handlePayment = async(e) => {
  //    e.preventDefault();
  



//setProcessing(true);




  return (

<Layout>
  {/* Header */}
  <div className={classes.payment_header}>Checkout ({totalItem}) items </div>



           {/* payment method */}
         <section className={classes.payment}>



                {/* address */}
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
                         {/* Form div */}
                  <div className={classes.payment_details}>  
                  <form onSubmit={handlePayment}>
                  {/* <form > */}
                                         {/* error */}
                                       {cardError && (<small style={{color:"red"}}>{cardError}</small>)}
                                   <CardElement onChange={handleChange} />

                                       {/* price */}
                                <div className={classes.payment_price}>
                                    <div>
                                        <span style={{display: "flex", gap: "10px"}}>
                                          <p>Total Order | </p><CurrencyFormat amount ={total} /> 
                                         </span>
                                       </div> 

                                       <button type="submit"> {
                                         processing?(
                      
                        
                                            <div className= {classes.loading}>
                                              <ClipLoader color ="gray" size ={12}/>
                                              <p>Please wait ...</p>
                                            </div>
                                              ):" Pay Now"
                                                 }
                                         </button>


                                </div>


                            </form>
                  </div>
               </div>
          </div>
  </section>
</Layout>  
  )
}
export default PaymentCard;
