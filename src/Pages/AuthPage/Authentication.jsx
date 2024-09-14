import React, { useState, useContext } from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import classes from'./Authentication.module.css'
import {auth} from '../../Utility/firebase'
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/action.type'
import { ClipLoader } from "react-spinners";


function Authentication() {
   
      const [email, setEmail]=  useState("");
const [password, setPassword]=  useState("");
const [error, setError]= useState("");
const [{user}, dispatch]= useContext(DataContext);
const navigate = useNavigate()
const navStateData = useLocation()
console.log(useLocation);



//loading...........................
const [loading, setLoading]=useState({   signIn:false, signUp:false})



//console.log(user)


const authHandler= async(e)=>{
    e.preventDefault();
    //console.log(e.target.name)
    if(e.target.name=="signin"){

         //firebase auth 
         setLoading({...loading, signIn:true})
        signInWithEmailAndPassword(auth, email,password)
        .then((userInfo)=>{
       // console.log(userInfo)

        //dispatch
      dispatch({

           type: Type.SET_USER,
           user: userInfo.user
      });
      setLoading({...loading, signIn:false})
      navigate(navStateData?.state?.redirect || "/")

        }) .catch((err)=>{
            //console.log(err.message)
            setError(err.message)
            setLoading({...loading, signIn:false})
            
          
             })
    }
    else{

        createUserWithEmailAndPassword(auth, email,password)
        .then((userInfo)=>{
           // console.log(userInfo)
           setLoading({...loading, signUp:true})
             //dispatch
      dispatch({
      
        type: Type.SET_USER,
        user: userInfo.user
       });
       setLoading({...loading, signUp:false})
      navigate(navStateData?.state?.redirect || "/")
     // navigate("/");

           }) .catch((err)=>{
              // console.log(err.message)
               setError(err.message)
               setLoading({...loading, signUp:false})
                })

    }
}



  return  (
    <section className={classes.login}>
        <Link to={"/"} >
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="" />
     </Link>

 {/* form page start*/}
          <div className={classes.login_container}>
           <h1>Sign In</h1>

           {navStateData?.state?.msg && (
           <small 
           style={{
            padding:"5px", 
            textAlign: "center",
            color:"red", 
            fontWeight: " bold "
             }} >
          {navStateData.state.msg}
            
            </small>
            )}









           <form action="">
                
                 <div>
              <label htmlFor="email">Email</label>
              <input value={email}  onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
              </div>
                
                <div>
                <label htmlFor="password">Password</label>
                <input  value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password"  />
                </div>
            

               {/* sign in  button start*/}
               <button  type="submit" name="signin"  onClick={authHandler}  className={classes.login_signInButton}>
                
               {/* cliploader */}

              {loading.signIn? (
                <ClipLoader color="#000" size={15}></ClipLoader>
                ):("Sign In")}
               
               </button>

              {/* agreement */}

        <p>
        By signing-in you agree to the AMAZONE FAKE CLONE Conditions of Use & Sale.Please see our Privacy Note,
         our cookies Notice and our interst-Based Ads Notice.
        </p>


        <button type="submit" name="signup"  onClick={authHandler}  className={classes.login_registerButton}>
          
            {/* cliploader */}

            {loading.signUp? (
                <ClipLoader color="#000" size={15}></ClipLoader>
                ):(" Create your Amazon Account")}
         </button>



{/* to display error message */}


   {error && <small style={{paddingTop:"5px", color:"red"}} >{error}</small>}




           </form>
         </div>
          {/* form page end*/}

    </section>
  )
}
export default Authentication
