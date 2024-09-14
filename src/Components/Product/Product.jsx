import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './product.module.css'
import Loader from '../../Components/Loader/Loader'



function Product() {

  const [products, setProducts]=useState()
  const [isLoading, setIsLoading]=useState(false)
  const [error, setError]= useState(null);
  
  useEffect(()=>{
   
    axios.get('https://fakestoreapi.com/products')
    .then((res)=>{
     setProducts(res.data);
     setIsLoading(false);

   })
   .catch((err)=>{
     console.log(err);
     setError('Failed  to featch products');
     setIsLoading(false);
     
    })
  
  },[])
  



  if (isLoading) { 
      
    return <Loader/>;
    }

    if(error){
    return <p>{error}</p>
    }

  return (

  <>
  {
  

      (  
      <section  className= {classes.products_container}>
        {
             products?.map((singleProduct)=> {
             return <ProductCard 
             renderAdd={true} 
             product={singleProduct} 
              key={singleProduct.id}
             />
        })
      }
      </section> 
      )
  }
  </>


  )
}
export default Product
