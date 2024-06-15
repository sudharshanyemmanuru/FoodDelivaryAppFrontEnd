import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import CartContext from "./context/CartContext";
import Loader from "./Loader";

const RestaurantFoodListing = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { restaurantId } = useParams();
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = useContext(CartContext);
  console.log("cart " + cart);
  useEffect(() => {
    axios
      .get(`http://localhost:9093/api/foodcatalog/${restaurantId}`, {
        method: "GET",
      })
      .then((resposne) =>
        setFoodItems(
          resposne.data.foodItemDtos.map((item) => ({ ...item, quantity: 0 }))
        )
      )
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  const incrementQuantity = (id) => {
    console.log(`incrementing food ${id}`);
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.foodItemId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    console.log(foodItems);
  };
  useEffect(() => {
    setCartItem(foodItems.filter((item) => item.quantity > 0));
  }, [foodItems]);
  const decrementQuantity = (id) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.foodItemId === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  function cartHandler() {
    cart.setCartItems(cartItem);
  }
  return (
    <div className="min-h-screen flex flex-col items-center relative bg-gray-100 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {foodItems.map((item) => (
          <div
            key={item.foodItemId}
            className="border border-gray-200 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{item.foodItemName}</h3>
              {item.veg ? (
                <div className="flex items-center">
                  <span className="text-green-600">&#x25A0;</span>{" "}
                  <span className="text-sm text-gray-500 ml-2">Veg</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-red-600">&#x25A0;</span>{" "}
                  <span className="text-sm text-gray-500 ml-2">Non-Veg</span>
                </div>
              )}
            </div>

            <p className="text-gray-500">${item.price}</p>
            <p className="text-gray-500">${item.itemDescription}</p>
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-gray-200 px-2 py-1 rounded-lg"
                onClick={() => decrementQuantity(item.foodItemId)}
              >
                -
              </button>
              <p className="mx-4">{item.quantity}</p>
              <button
                className="bg-gray-200 px-2 py-1 rounded-lg"
                onClick={() => incrementQuantity(item.foodItemId)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pb-40">
        {cartItem.length > 0 ? (
          <CheckoutButton
            handler={() => cart.setCartItems(cartItem)}
            itemCount={cartItem.length}
          />
        ) : null}
      </div>
      {foodItems.length == 0 && loading ? (
        <Loader />
      ) : foodItems.length == 0 && loading == false ? (
        <div className="text-center w-full font-bold m-2 p-9 text-xl">
          Oops!! No Food Items found In this restaurant
        </div>
      ) : null}
    </div>
  );
};

export default RestaurantFoodListing;
