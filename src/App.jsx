import "./App.css";
import Restaurants from "./components/Restaurants";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./components/Orders";
import RestaurantFoodListing from "./components/RestaurantFoodListing";
import CheckOut from "./components/CheckOut";
import CartContextProvider from "./components/context/CartContextProvider";
import ChatIcon from "./components/ChatIcon";
import ChatWindow from "./components/ChatWindow";
import { useState } from "react";
function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <CartContextProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Restaurants />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Orders />
            </>
          }
        />
        <Route
          path="/foods/:restaurantId"
          element={<RestaurantFoodListing />}
        />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </BrowserRouter>
    <ChatIcon onClick={() => setChatOpen(true)} />
      {chatOpen && <ChatWindow onClose={() => setChatOpen(false)} />}
  </CartContextProvider>
  );
}

export default App;
