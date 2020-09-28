import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import './App.css';
import Header from "./components/Header"
import { Slider } from "@material-ui/core"
import API from "./adapters/API"


const Map = () => {
  // live taxis from API ENDPOINT
  const [ cabs, setCabs ] = useState([])
  // center point of map Splyt office
  const [ centerPoint ] = useState([51.5049375, -0.0964509])
  // current slider's value/distance
  const [ distance ] = useState(1)


  // a function that takes a bearing and calculates the new coordinates using the distance and center points from state
  const newCoord = (br) => {

    const bearingRadian = (90-br)*Math.PI/180

    const deltaX = distance * Math.cos(bearingRadian)
    const deltaY = distance * Math.sin(bearingRadian)

    const x  = centerPoint[0] + deltaX
    const y = centerPoint[1] + deltaY

    return {x, y}
  }

  // fetch live taxi data
  const fetchCabs = () => {
    return API.getTaxis().then(data => {
      setCabs(data.drivers)
    })
  }

  //Call for the taxi data once the app has fully been loaded
  useEffect(() => {
    fetchCabs();
  }, []);

// grab the bearing element of each taxi object
const taxiBearings = cabs.map(c => c.location.bearing)

// take each bearing and pass it to the function in order to get new coordinates
const taxiCoord = () => {
  // make an array to insert all the new cab points as x/y objects
  let endPoints = []
    taxiBearings.forEach(br => (
      endPoints.push(newCoord(br))
      ))
      endPoints.forEach(arr => (
        console.log(typeof arr.x, parseFloat(arr["y"]), "HEY") 
        // <Marker  key={arr.y} position={{ lat : parseFloat(arr.x), lng: parseFloat(arr.y) }} />
      ))
    }
    

  return (
    <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 51.5049375, lng: -0.09612135008594562 }}
    >
           <Marker position={{ lat: 51.5049375, lng: -0.09612135008594562}} />
           <Marker position={{ lat: 51.5059375, lng: -0.09612435008594562}} />
    {taxiCoord()}
 
     
    </GoogleMap>
  )
  }
  
const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function App() {
 
  const marks = [
    {
      value: 0,
      label: "0"
    },
    {
      value: 100,
      label: "100"
    }
  ]
 
  const getValue = (value) => {
    // console.log(value)
  }

return (
<div>
  <Header />
<div  style={{ width: 650, margin: 50 }} >
  <Slider 
    defaultValue={10}
    maxValue={100}
    step={10}
    onChange={getValue}
    marks={marks}
    valueLabelDisplay="auto"
  >
  </Slider>
</div>
  <WrappedMap 
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAmtFOC7NcpCM4YwCEZTm4zpgpVtesPJMI"
    loadingElement={<div style={{ height: `10%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    >
  
  </WrappedMap>
</div>
)
};
