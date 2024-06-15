import React from 'react'

function EmailTemplate({orderItems,totalAmount}) {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-lg mb-6">Your order has been confirmed and will be delivered soon.</p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Item</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Price</th>
          </tr>
        </thead>
        <tbody>
        {orderItems.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2">{item.foodItemName}</td>
            <td className="border border-gray-300 p-2">{item.quantity}</td>
            <td className="border border-gray-300 p-2">{item.price}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="border border-gray-300 p-2 text-right">Total:</td>
            <td className="border border-gray-300 p-2">${totalAmount}</td>
          </tr>
        </tfoot>
      </table>
      <p className="text-lg mt-6">For any inquiries, please contact us at support@example.com.</p>
    </div>
  )
}

export default EmailTemplate