import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4 bg-gray-800'> 
        <img src='https://penji.co/wp-content/uploads/2022/08/11.Foodigy-logo.jpg' alt="" className='w-[80px]'/>
        <Link to="/" className='text-white text-3xl font-bold'>Home</Link>
        <Link to="/orders" className='text-white text-3xl font-bold'>Orders</Link>
    </div>
  )
} 
export default Navbar;