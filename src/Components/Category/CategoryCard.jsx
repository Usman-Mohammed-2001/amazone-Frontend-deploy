import React from 'react'
import classes from './CategoryCard.module.css'
import {Link} from 'react-router-dom' 


function CategoryCard({ data }) {
  
  return (
    <div className={classes.category}>
         {/* <Link to = {`/category/${data.name}`}>
               <span>
                 <h2>{data?.title}</h2>
               </span>
            <img src={data?.imgLink} alt="" />
            <p>shop now</p>
         </Link>  */}

         {/* chatgpt source */}


         <Link to = {`/category/${encodeURIComponent(data.name)}`}   className={classes.categoryLink}>
               <span>
                 <h2>{data?.title}</h2>
               </span>
            <img src={data?.imgLink} alt={`Image for ${data?.title}` } className={classes.categoryImage} />          
            <p>shop now</p>
         </Link> 













   {/*end category  class  */}
    </div>
  )
}

export default CategoryCard


