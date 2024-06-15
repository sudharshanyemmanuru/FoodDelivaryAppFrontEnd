import React, { useEffect, useState } from "react";
import axios from "axios";
import Restaurant from "./Restaurant";
import Loader from "./Loader";
function Restaurants() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");
  const [err, setErr] = useState({});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      console.log("geo locator has some issues to fetch data");
    }
    function success(position) {
      var { latitude, longitude } = position.coords;
      // latitude = 14.7526;
      // longitude = 78.5541;
      let isChanged = false;
      if (
        localStorage.getItem("latitude") &&
        localStorage.getItem("longitude")
      ) {
        let lat = Number(localStorage.getItem("latitude"));
        let lon = Number(localStorage.getItem("longitude"));
        console.log(
          `lat ${lat} lon ${lon} latitude : ${latitude} longitude : ${longitude}`
        );
        if (latitude !== lat || longitude !== lon) isChanged = true;
      }
      console.log(
        `lat : ${latitude} long: ${longitude} isChanged ${isChanged}`
      );
      //if(JSON.parse())
      if (!localStorage.getItem("locations") || isChanged) {
        axios
          .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f0a1fb30ffed4b94b2e494013b8f2729`
          )
          .then((resp) => {
            setLocation(
              resp.data.results[0].components.state_district +
                " " +
                resp.data.results[0].components.city
            );
            localStorage.setItem(
              "locations",
              JSON.stringify(
                resp.data.results[0].components.state_district +
                  " " +
                  resp.data.results[0].components.city
              )
            );
            localStorage.setItem("latitude", latitude.toString());
            localStorage.setItem("longitude", longitude.toString());
          })
          .catch((err) => {
            console.log(`error : ${err.message}`);
          });
      } else {
        setLocation(JSON.parse(localStorage.getItem("locations")));
      }
    }
    function error(err) {
      console.log(`${err.message}`);
    }
  });

  function searchHandler(e) {
    setSearch(e.target.value.toLowerCase());
  }
  useEffect(() => {
    if (location || !localStorage.getItem("restaurants")) {
      const url = "http://localhost:9091/api/restaurants/all/" + location;
      axios
        .get(url, {
          method: "GET",
        })
        .then((resp) => {
          setItems(resp.data);
          localStorage.setItem("restaurants", JSON.stringify(resp.data));
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("fetching restaurants from local");
      setItems(JSON.parse(localStorage.getItem("restaurants")));
      console.log(items);
    }
  }, [location]);
  return (
    <>
      <div className="text-center w-full font-bold m-2 p-9 text-xl">
        Order Your Food Now
      </div>
      <div className="flex justify-center my-4 placeholder-animate ">
        <input
          type="text"
          className="w-[28rem] h-[3rem] bg-gray-200 outline-none p-5"
          placeholder="Search Hotel"
          onChange={searchHandler}
        />
        {items.length === 0 ? <Loader /> : null}
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-8px m-10px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center bg-gray50">
        {items
          .filter((item) => item.restaurantName.toLowerCase().includes(search))
          .map((item) => {
            return (
              <Restaurant
                restaurantName={item.restaurantName}
                restaurantId={item.id}
                poster={item.posterPath}
              />
            );
          })}
        
      </div>
    </>
  );
}

export default Restaurants;
