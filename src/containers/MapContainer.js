import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";



const TAXI_ENDPOINT = "https://qa-interview-test.qa.splytech.io/api/drivers?&longitude=-0.0964509&count=5"
const CORS_URL = `https://cors-anywhere.herokuapp.com/${TAXI_ENDPOINT}`



const MapContainer = () => {
    const [ cabs, setCabs ] = useState([])
    const [ centerPoint, setCenterPoint ] = useState([51.5049375, -0.0964509])
    const [ distance, setDistance ] = useState(1)
    const [ radius, setRadius ] = useState(6371)
    const [ angularDistance, setAngularDistance ] = useState(distance/radius)
    const [ bearing, setBearing ] = useState(0)

    const WrappedMap = withScriptjs(withGoogleMap(Map))
    
    const jsonify = res => res.json()
    
    const getTaxis = () => {
        return fetch(CORS_URL).then(jsonify).then(data => {
          setCabs(data)
        })
      }
    
    
      useEffect(() => {
        getTaxis();
      }, []);
    


    return (
        <div className={"con-wrapper"}>

    <WrappedMap 
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAmtFOC7NcpCM4YwCEZTm4zpgpVtesPJMI"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    >
  </WrappedMap>
        </div>
    );
};

export default MapContainer;