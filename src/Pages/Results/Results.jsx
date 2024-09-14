import React,{useEffect, useState} from 'react';
import Layout from '../../Components/LayOut/Layout';
import { useParams } from 'react-router-dom';
import {productUrl} from '../../Api/endPoints';
import axios from 'axios';
import classes from './Results.module.css';
import ProductCard from '../../Components/Product/ProductCard';





function Results() {
  const [results,setResults]=useState([]);
  // const [error, setError] = useState(null);
  const {categoryName} = useParams();



  useEffect(()=>{

    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      setResults(res.data);
    })
    .catch((err)=>{
      console.log(err);
     // setError('Faild tot fetch products.');
    })
  
  },[])

  return (
    
<Layout>
  {/* start */}
  <section>
              <h1 style={{padding:"30px"}}> Results </h1>
              <p style={{padding:"30px"}}>  Category/  {categoryName}</p>
           <hr />


          
               <div className={classes.products_container}>
               {results?.map((product)=>(
               <ProductCard
                 key={product.id}
                  product={product}
                  renderDesc={true}
                  renderAdd={true}
                  />
               ))}
               </div>
       </section>
  {/* end */}
</Layout>
  )
}

export default Results
