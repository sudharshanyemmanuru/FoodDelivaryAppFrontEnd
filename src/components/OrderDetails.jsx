import React from 'react'

function OrderDetails({order}) {
  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
      <div className="flex flex-wrap justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
          <span className="text-gray-600 font-medium lg:mr-2">Order ID:</span>
          <span className="text-gray-800">{order.orderId}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
          <span className="text-gray-600 font-medium lg:mr-2">Restaurant:</span>
          <span className="text-gray-800">{order.restaurantDto.restaurantName}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
          <span className="text-gray-600 font-medium lg:mr-2">Items:</span>
          <span className="text-gray-800">{order.foodItemsDtos.map(food=>food.foodItemName).join(', ')}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
          <span className="text-gray-600 font-medium lg:mr-2">Total Price:</span>
          <span className="text-gray-800">12345678</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
          <span className="text-gray-600 font-medium lg:mr-2">Order Date:</span>
          <span className="text-gray-800">1234567</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails