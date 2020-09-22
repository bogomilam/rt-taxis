import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import './App.css';

function Map() {
  return (
    <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 51.5049375, lng: -0.0964509}}
   />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function App() {
return <div>
  <WrappedMap 
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAmtFOC7NcpCM4YwCEZTm4zpgpVtesPJMI"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    />
</div>
};
