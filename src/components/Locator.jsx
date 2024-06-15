import axios from 'axios';
import React, { useState } from 'react'

function Locator() {
    const[location,setLocation]=useState('')
    const[err,setErr]=useState({})
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success,error);
    }
    function success(position){
        const {latitude,longitude}=position.coords;
        console.log(`lat : ${latitude} long: ${longitude}`)
        const response=  axios.get(`https://api.opencagedata.com/geocode/v1/json?q=13.0216306+80.1763358&key=f0a1fb30ffed4b94b2e494013b8f2729`).then(
            (resp)=>setLocation(resp.data.results[0].components.state_district)
        )
    }
    function error(err){
        console.log(`${err.message}`)
    }
  return (
    <>
        <h1>Location Name : {location}</h1>
    </>
  )
}

export default Locator