

        {/* chatGpt */}
        
        import React, {useContext, useState, useEffect} from 'react';
        import Layout from '../../Components/LayOut/Layout';
        import classes from "./orders.module.css";
        import {db} from "../../Utility/firebase";
        import {DataContext} from "../../Components/DataProvider/DataProvider";
        import ProductCard from '../../Components/Product/ProductCard';
        
        
function Orders() {


  const  [{user}, dispatch] = useContext(DataContext);   
  const [orders, setOrders] = useState([]);
   
   useEffect(()=>{
          if(user){
             const unsubscribe = db.collection('users')          
            .doc(user.uid)
            .collection('orders')
            .orderBy('created','desc')
            .onSnapshot((snapshot)=>{
                      setOrders(
                        snapshot.docs.map((doc)=>({
                          id:doc.id,
                          data:doc.data()
                        }))
                      );
            });
//Clean up subscription on unamount
  return ()=> unsubscribe();
          } else{
            setOrders([]);
          }   
   },[]);

    },[user]);     // Dependancy array includes 'user'
  return (
   <Layout>
     <section className={classes.container}>
         <div className={classes.orders_container}>
         <h2>Your Orders</h2>
         {orders.length === 0 &&  ( 
        
         <div style={{padding: '20px' }}> you don't have orders yet.</div>
         )} 
            
         { orders.map((eachOrder)=>{
         <div key={eachOrder.id}>
                <hr/>
                <p>Order ID: {eachOrder.id}</p>
                  eachOrder.data.basket?.map((order)=>{ 
                    <ProductCard
                    flex={true}
                    product={order}
                    key={order.id}
                    />
                  ))}
           </div>         
          ))}
     </div> 
         </div>
     </section>
</Layout>
     );
}
 export default Orders
        
{/* chatgpt ouput */}

