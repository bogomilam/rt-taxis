import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import './App.css';
import Header from "./components/Header"
import {Slider} from "@material-ui/core"



const TAXI_ENDPOINT = "https://qa-interview-test.qa.splytech.io/api/drivers?&longitude=-0.0964509&count=5"
const CORS_URL = `https://cors-anywhere.herokuapp.com/${TAXI_ENDPOINT}`




const Map = () => {
  const [ cabs, setCabs ] = useState([])
  const [ centerPoint, setCenterPoint ] = useState([51.5049375, -0.0964509])
  const [ distance, setDistance ] = useState(1)
  const [ radius ] = useState(6371)
  const [ angularDistance ] = useState(distance/radius)
  // const [ newCoord, setNewCoord ] = useState([0, 0])
  const [ newBearing, setNewBearing ] = useState([])


  const newPoints = (br) => {
    let newCoodArr = []
    let la2 = Math.asin( Math.sin(centerPoint[0] * Math.cos(angularDistance) + (Math.cos(centerPoint[0]) * Math.sin(angularDistance)) * Math.cos(br)) )
    // console.log(la2, "LA2")
    let lng2 = centerPoint[1] + Math.atan2( Math.sin(br) * Math.sin(angularDistance) * Math.cos(centerPoint[0]) , Math.cos(angularDistance) - Math.sin(centerPoint[0]) * Math.sin(la2) )
    //  console.log(lng2, "Lng2")
     newCoodArr.push(la2, lng2)
     return newCoodArr
  }

  const getTaxis = () => {
    return fetch(CORS_URL).then(jsonify).then(data => {
      setCabs(data.drivers)
    })
  }

  const jsonify = res => res.json()

  useEffect(() => {
    getTaxis();
  }, []);

  const newtaxiBearings = cabs.map(c => c.location.bearing).forEach(br => (
    // console.log(newPoints(br)[0])
     <Marker  position={{ lat: newPoints(br)[0], lng: newPoints(br)[1] }} />
  ))
    // console.log(newPoints(br)) )
  // console.log(newtaxiBearings)


  return (
    <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 51.5049375, lng: -0.09612135008594562 }}
    >
       <Marker position={{ lat: 51.5049375, lng: -0.0964509 }}/>


{/* {cabs.map(c => console.log(c.location.bearing))} */}



     
    </GoogleMap>
  )
  }
  


const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function App() {
 
  const mark = [
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
  marks={mark}
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
