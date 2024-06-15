import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CheckoutButtonStyles.css'
const CheckoutButton = ({handler,itemCount}) => {
  return (
    <Link
        to={'/checkout'}
      className="  bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 shine"
      onClick={handler}
    >
      Checkout {itemCount} Items
    </Link>
  );
};

export default CheckoutButton;