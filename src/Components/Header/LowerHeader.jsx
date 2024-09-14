import React from 'react'
import classes from './header.module.css'
import { AiOutlineMenu } from "react-icons/ai";
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
       
         <ul>
            <li>
            <AiOutlineMenu />
                <p>All</p>

            </li>
            <li>ToDay's Deals</li>
            <li>Customer Services</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
         </ul>
    </div>
  )
}

export default LowerHeader
