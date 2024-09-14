import React, { useContext } from 'react';
import Layout from '../../Components/LayOut/Layout';
import ProductCard from '../../Components/Product/ProductCard';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from 'react-router-dom';
import classes from './Cart.module.css';
import {Type} from '../../Utility/action.type';
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io";





function Cart() {
  const [{basket, user}, dispatch]= useContext(DataContext);
  const total = basket.reduce((amount, item) => {
   return item.price * item.amount + amount
  }, 0);
 

  // increament function
  const increment = (item) =>
    {
     dispatch({
       type: Type.ADD_TO_BASKET,
       item,
     });
   };
 // increament function
 const decrement = (id) => {
  dispatch({
    type: Type.REMOVE_FROM_BASKET,
    id,
  });
};






  return (
  
  <Layout>
      <section className={classes.container}>
            <div className={classes.cart_container}>
            {/* start */}
           <h2>Hello</h2>
           <h3>Your shopping basket</h3>
          <hr />
          {
          basket?.length  == 0 ? ( 
          <p>Opps ! No item in your cart</p>
        ):(
            basket?.map((item, i) => {
              return <section className={classes.cart_product}>          
             {/* start button section */}
              
              <ProductCard
              key={i}
              product={item}
              renderDesc={true}
              renderAdd={false}
              flex={true}
              />

            <div  className={classes.btn_container}>
                  <button  className={classes.btn} onClick={() => increment(item)}> <IoIosArrowUp size={20}/> </button>
                  <span>{item.amount}</span>
                  <button  className={classes.btn} onClick={() => decrement(item.id)}><IoIosArrowDown size={20}/></button>
               </div>




            {/* end button section */}
           </section>
            })
          )}
            </div>

{/* sbu total calculate */}
{basket?.length !== 0 && (

 <div className={classes.subtotal}>
              <div >
                <p> SubTotal ({basket?.length} items) </p>
                <CurrencyFormat amount={total}/>           
              </div>

              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
                {/* <Link to="/Payment"> containue to checkout </Link> */}
                {/* <a href="/payments">containue to checkout </a> */}
                 
                 
                 {/* to test */}
                <Link to="/PaymentCard"> containue to checkout </Link>
              </span> 
 </div>
)}
      </section>
  </Layout>
   
  )
}
export default Cart 
