// import React from 'react';
import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import './App.css';
import Header from "./components/Header"
import MapContainer from "./containers/MapContainer"



const TAXI_ENDPOINT = "https://qa-interview-test.qa.splytech.io/api/drivers?&longitude=-0.0964509&count=5"
const CORS_URL = `https://cors-anywhere.herokuapp.com/${TAXI_ENDPOINT}`




const Map = () => {
  const [ cabs, setCabs ] = useState([])
  const [ centerPoint, setCenterPoint ] = useState([51.5049375, -0.0964509])
  const [ distance, setDistance ] = useState(1)
  const [ radius, setRadius ] = useState(6371)
  const [ angularDistance, setAngularDistance ] = useState(distance/radius)
  const [ bearing, setBearing ] = useState(0)
  const [ newCoord, setNewCoord ] = useState([0, 0])



  const newMarker = () => {
    setNewCoord(newPoints[0], newPoints[1])
}
  const newPoints = () => {
    let newCoodArr = []
    let la2 = Math.asin( (Math.sin(centerPoint[0]) * Math.cos(angularDistance) + (Math.cos(centerPoint[0]) * Math.sin(angularDistance)) * Math.cos(bearing)) )
    // console.log(la2, "LA2")
    let lng2 = centerPoint[1] + Math.atan2( Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(centerPoint[0]) , Math.cos(angularDistance) - Math.sin(centerPoint[0]) * Math.sin(la2) )
    //  console.log(lng2, "Lng2")
     newCoodArr.push(la2, lng2)
     return newCoodArr
  }

  const getTaxis = () => {
    return fetch(CORS_URL).then(jsonify).then(data => {
      setCabs(data)
    })
  }

  const jsonify = res => res.json()

  useEffect(() => {
    getTaxis();
  }, []);


  
  return (
    <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 51.5049375, lng: -0.0964509 }}
    >

    </GoogleMap>
  )
  }
  


const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function App() {
  
 
  
return (
<div>
  <Header />

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
