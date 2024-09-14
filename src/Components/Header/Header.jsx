import React, { useContext} from 'react'
import {Link} from  'react-router-dom'
import classes from './header.module.css'
import LowerHeader from './LowerHeader'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';



function Header() {

const [{user, basket}, dispatch]=useContext(DataContext)
const totalItem = basket?.reduce((amount,item)=>{
  return item.amount +  amount
},0)





  return (


      <section className={classes.fixed} >
          <section>
        <div  className={classes.header_container}> 
           {/* logo section start*/}
           <div  className={classes.logo_container}>
           
            <Link to="/">
             <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240326183545/amazon.png" alt="amazon log" />
            </Link>
      
             {/* delivery start*/}
             <div  className={classes.delivery}>
             <span>
             <SlLocationPin/>
             </span>

             <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
             </div>
            </div>
           </div>
         {/* delivery end*/}
       {/* logo section end*/}





  {/* search  area  start*/}
       
             <div className={classes.search}>   
               <select name="" id="">
                <option value="">All</option>
               </select>
                <input type="text"/>
              <BsSearch size={38}/>
              </div> 
       
  {/* search  area  end*/}




{/* other section start*/}
<div className={classes.order_container}>
  <Link to="" className={classes.language}>
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg" alt="USA flag" />
          <select name="" id="">
            <option value="">EN</option>
          </select>
          </Link>
  {/* Three components */}
  <Link to={!user && "/Authentication"}>
      <div>
        {
          user?(
            <>
              <p>Hello {user?.email?.split("@")[0]} </p>
              <span onClick={()=>auth.signOut()}>Sign Out</span>
            </>
 
           ):(
 
             <>
             <p>Sign In</p>
             <span>Account & Lists</span>
             </>
           )
            
        }
         

      </div>


 
  

  </Link> 
    
      <Link to= "/orders"> 
      <p>return</p>
      <span>& Orders</span>
      </Link>

      
       <Link to="/cart" className={classes.cart} >
      <BiCart size={35}/>
    <span>{totalItem}</span>
     </Link>
     
</div>

{/* other section End*/}

        </div>
        </section>
        <LowerHeader/> 
      </section>
  )
}
export default Header
