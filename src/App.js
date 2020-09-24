import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import './App.css';
import Header from "./components/Header"
import {Slider} from "@material-ui/core"

const TAXI_ENDPOINT = "https://qa-interview-test.qa.splytech.io/api/drivers?&longitude=-0.0964509&count=5"
const CORS_URL = `https://cors-anywhere.herokuapp.com/${TAXI_ENDPOINT}`


const Map = () => {
  // live taxis from ENDPOINT
  const [ cabs, setCabs ] = useState([])
  // center point of map for the new coordinates
  const [ centerPoint ] = useState([51.5049375, -0.0964509])
  // current distance/radius in km
  const [ distance ] = useState(1)
  // radius of the earth in km
  const [ radius ] = useState(6371)
  //angular distance for the new coordinates
  const [ angularDistance ] = useState(distance/radius)
  // const [ newBearings, setNewBearings ] = useState({})


  // a function that takes a bearing and calculates the new coordinates using distance and center point from state
  const newPoints = (br) => {
    let newCoodArr = []
    let la2 = Math.asin( Math.sin(centerPoint[0] * Math.cos(angularDistance) + (Math.cos(centerPoint[0]) * Math.sin(angularDistance)) * Math.cos(br)) )
    // console.log(la2, "LA2")
    let lng2 = centerPoint[1] + Math.atan2( Math.sin(br) * Math.sin(angularDistance) * Math.cos(centerPoint[0]) , Math.cos(angularDistance) - Math.sin(centerPoint[0]) * Math.sin(la2) )
    //  console.log(lng2, "Lng2")
     newCoodArr.push(la2, lng2)
     return newCoodArr
  }

  const newCoord = (br) => {
    const bearingRadian = (90-br)*Math.PI/180

    const deltaX = distance * Math.cos(bearingRadian)
    const deltaY = distance * Math.sin(bearingRadian)

    const x  = centerPoint[0] + deltaX
    const y = centerPoint[1] + deltaY

    // console.log({x, y})
    return {x, y}
  }

  // fetch live taxi data
  const getTaxis = () => {
    return fetch(CORS_URL).then(jsonify).then(data => {
      setCabs(data.drivers)
    })
  }

  // Format response into JSON
  const jsonify = res => res.json()

  //Call for the taxi data once the app has been loaded
  useEffect(() => {
    getTaxis();
  }, []);


// grab the bearing of each taxi
const taxiBearings = cabs.map(c => c.location.bearing)

// take each bearing and pass it to the function in order to get new points
const taxiCoord = () => {
    taxiBearings.map(br => (
      <Marker key={1} position={{ lat: newCoord(br)['x'], lng: newCoord(br['y']) }} />
      ))
      // console.log(newCoord(br)['x'], " hdhgd", newCoord(br)['y'])
    }


  return (
    <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 51.5049375, lng: -0.09612135008594562 }}
    >
     {taxiCoord()}
     
    </GoogleMap>
  )
  }
  
const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function App() {
 
  const marks = [
    {
      value: 0,
      label: "1"
    },
    {
      value: 100,
      label: "100"
    }
  ]
 
  const getValue = (value) => {
    console.log(value)
  }

return (
<div>
  <Header />
<div style={{ width: 650, margin: 50 }} >
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
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    >

  </WrappedMap>
</div>
)
};
