import { useContext, useEffect, useState } from "react";
import CartContext from "./context/CartContext";
import axios from "axios";
import OrderAlert from "./OrderAlert";
import ReactDOMServer from 'react-dom/server';
import EmailTemplate from "./EmailTemplate";

function CheckOut() {
  const cart = useContext(CartContext);
  const [isPlaced, setIsPlaced] = useState(false);
  let orderTobePlaced = {
    foodItemsDtos: cart.cartItems,
    restaurantDto: {},
    userId: 8,
    emailTemplate:''
  };
  useEffect(() => {
    axios
      .get(
        "http://localhost:9091/api/restaurants/" +
          cart.cartItems[0].restaurantId
      )
      .then((resp) => (orderTobePlaced.restaurantDto = resp.data))
      .catch((err) => console.log(`error occured : ${err.message}`));
  }, [cart.items]);
  function placeOrder() {
    console.log(orderTobePlaced);
    let total = cart.cartItems
      .map((item) => item.price * item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
      initiateRazorpay(total)
  }
  function initiateRazorpay(amount) {
    console.log("total Amount " + amount);
    console.log(typeof amount);
    // let amt = parseInt(amount);
    fetch("http://localhost:9094/api/payment/" + amount)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var options = {
          key: data.key,
          amount: data.amount,
          currency: "INR",
          name: "Online-Food-Delivary",
          description: "Payment for placing your order",
          order_id: data.id,
          handler: function (response) {
            if (response != null && response.razorpay_payment_id != null) {
              let total=cart.cartItems
              .map((item) => item.price * item.quantity)
              .reduce((acc, curr) => acc + curr, 0);
              const emailTemplateString=emailTemplate(orderTobePlaced.foodItemsDtos,total)
              orderTobePlaced.emailTemplate=emailTemplateString;
              axios
                .post("http://localhost:9094/api/orders/place", orderTobePlaced)
                .then((resp) => setIsPlaced(true))
                .catch((err) => console.log(err.message));
            }
            console.log(response);
          },
          prefill: {
            // Pre-fill customer details if available
            name: "Customer Name",
            email: "customer@example.com",
            contact: "Customer Phone Number",
          },
          theme: {
            color: "#F37254", // Customize color theme as needed
          },
        };
        var rzp = new Razorpay(options);
        rzp.open(); // Open Razorpay payment popup
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }
  function closePopup() {
    setIsPlaced(false);
  }
  function emailTemplate(orderItems,total){
    return ReactDOMServer.renderToString(<EmailTemplate orderItems={orderItems} totalAmount={total}/>)
  }
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b">Item</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Price</th>
              <th className="py-2 px-4 bg-gray-100 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item) => (
              <tr className="hover:bg-gray-50">
                <td className="py-1 px-4 border-b">{item.foodItemName}</td>
                <td className="py-1 px-4 border-b">{item.price}</td>
                <td className="py-1 px-4 border-b">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
      
        <div className="text-lg font-semibold">
          Total:{" "}
          {cart.cartItems
            .map((item) => item.price * item.quantity)
            .reduce((acc, curr) => acc + curr, 0)}
        </div>
        <button
          onClick={placeOrder}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 shine"
        >
          Order Now
        </button>
      </div>
      {isPlaced ? (
        <OrderAlert
          message={"order placed successfully!!. Please check your mail for details"}
          onClose={closePopup}
        />
      ) : null}
    </div>
  );
}

export default CheckOut;
