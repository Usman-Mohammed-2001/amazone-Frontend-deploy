import React,{useContext, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { DataContext } from '../DataProvider/DataProvider'




const ProtectedRoute = ({Children, msg, redirect}) => {

     const navigate = useNavigate()
     const [{user}] = useContext(DataContext)

     useEffect(()=>{

          if(!user){
            navigate('/authentication', { state : {msg, redirect} });
          }
   
  },[user, navigate, redirect]);

  return user ? Children : null;
 
}
export default ProtectedRoute
