import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import "./Map.css";
const Map = props => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAIKimjmbuSWihT65oL06wB9fjG8wBxasI"
    });
    
    return isLoaded ? (
        <GoogleMap 
            zoom={10} 
            center={props.center} 
            mapContainerClassName="map"
            >
            <Marker position={props.center}/>
        </GoogleMap>
        ) : <></>;
};

export default (Map);