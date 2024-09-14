import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Authentication  from './Pages/AuthPage/Authentication';
import Newpayment from './Pages/Payment/PaymentCard';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Results from './Pages/Results/Results';
//import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
// stripe 
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe } from '@stripe/stripe-js';


//PK   load Stripe public key
const stripePromise = loadStripe('pk_test_51PhPymAnFvR1Jh3C6tXd22COHt2jgnMQGtiwDXbZB1OB7XppS3mEY3KwUQZSHCn2kJLmxOE26vuNajoA3zDoBkjo00NP9Kg9d9');




function Routing() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Authentication" element={<Authentication/>}/>

          <Route path="/orders"  element = { 
              //<ProtectedRoute msg ={"You must login to access orders "}   redirect={"/orders"}>
             <Orders/> 
               // </ProtectedRoute> 
             }/>
           



           {/*********************PaymentCard**************************/}
         <Route path="/PaymentCard"  element = { 
                
               //<ProtectedRoute msg ={"You must log in to pay"}   redirect={"/PaymentCard"}>
                           <Elements stripe={stripePromise}>
                           <Newpayment />
                           </Elements> 

              //  </ProtectedRoute> 

              }/>      
         {/* ****************************************************** */}
               {/*Public routes */}
          <Route path="/cart" element={<Cart/>}/> 
           <Route path="/products/:productId" element= {<ProductDetail/>}/>
          <Route path="/category/:categoryName" element={<Results/>}/>
      </Routes>
      
    </Router>
  );
}

export default Routing
