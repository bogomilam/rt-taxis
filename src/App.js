// import React from 'react';
import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import './App.css';
import API from "./adapters/API"

const TAXI_ENDPOINT = "https://qa-interview-test.qa.splytech.io/api/drivers?"
const CORS_URL = `https://cors-anywhere.herokuapp.com/${TAXI_ENDPOINT}`


function Map() {
  const [ drivers, setDrivers ] = useState(null)

  const getTaxis = () => {
    return fetch(CORS_URL).then(jsonify).then(data => setDrivers(data))
  }

  const jsonify = res => res.json()

  useEffect(() => {
    getTaxis()
    .catch(console.error)
  }, []);

  
  return (
    <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 51.5049375, lng: -0.0964509}}
    >
      
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))


export default function App() {
  
 
  
return (
<div>
  <WrappedMap 
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAmtFOC7NcpCM4YwCEZTm4zpgpVtesPJMI"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  >
    
  </WrappedMap>
</div>
)
};
