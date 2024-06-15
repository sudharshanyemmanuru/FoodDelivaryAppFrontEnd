import React, { useState } from 'react'
import { Link } from 'react-router-dom';
function Restaurant({restaurantName,restaurantId,poster}) {
  const posterPath='http://localhost:9091/api/restaurants'+poster
  return (
    <>
    <div
      className="h-[45vh] w-[300px]  bg-cover bg-center"
      style={{
        backgroundImage: `url(${posterPath})`,
        margin: '20px'
      }}
    >
      <div className="text-white text-xl text-center w-full bg-gray-900/60">
        {restaurantName}
      </div>
      <Link to={`/foods/${restaurantId}`} className="bg-black text-white border-b-2 flex justify-center">
          Order Now </Link>
        
    </div>
    </>
  )
}

export default Restaurant;