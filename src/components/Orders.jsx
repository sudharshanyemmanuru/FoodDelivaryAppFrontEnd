import React, { useEffect, useState } from 'react'
import OrderDetails from './OrderDetails';
import axios from 'axios';
import Loader from './Loader';


const Orders = () => {
  const[orders,setOrders]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:9094/api/orders/order/8')
    .then((resp)=>setOrders(resp.data))
    .catch((err)=>console.log(err.message))
  }),[]
  return (
    <>
      {orders.map(order=>{
        return <OrderDetails order={order}/>
      })}
      {orders.length===0 ? <Loader/>:null}
    </>
  );
};

export default Orders;
