import React, { useState } from "react";
import CheckOut from "./CheckOut";


export const CartContext=React.createContext();

export const CartProvider=()=>{
    const[cartItems,setCartItems]=useState([])
    const updateCart=(items)=>{
        setCartItems(items)
    }
    return(
        <CartContext.Provider value={{cartItems,updateCart}}>
            <CheckOut/>
        </CartContext.Provider>
    )
}
