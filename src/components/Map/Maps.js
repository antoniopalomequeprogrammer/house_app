import React, { useState, useEffect } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";
import PARAMS from "utils/PARAMS";

Geocode.setApiKey(PARAMS.GOOGLE_API_KEY);
Geocode.setLanguage("es");
Geocode.setRegion("es");

// "react-geocode": "^0.2.1",
// "google-maps-react": "^2.0.6",

function MapContainer(props) {

  const [activeMarker, setActiveMarker] = useState({
    position: {lat: 37.8784582, lng: -4.7889751},
    animation: props.google.maps.Animation.BOUNCE,
  });
  const [center, setCenter] = useState(null);

  const {lat, lng, address, setPosition} = props;

  useEffect(() => {
    if (props.lat && props.lng) {
      setActiveMarker({
        position: {lat: props.lat, lng: props.lng},
        animation: props.google.maps.Animation.BOUNCE,
      })
      setCenter({lat: props.lat, lng: props.lng});
    }else{

      if (props.address) {
        Geocode.fromAddress(`${props.address}, Córdoba`).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            setActiveMarker({
              position: {lat: lat, lng: lng},
              animation: props.google.maps.Animation.BOUNCE
            })
            setCenter({lat: lat, lng: lng});
            setPosition(lat, lng)
          },
          error => {
            console.error(error);
          }
        )
      }else{
        setCenter({lat: activeMarker.position.lat, lng: activeMarker.position.lng});
      }
    }

  }, [lat, lng, address]);

  let mapWidth = props.width ? props.width : '50vw';
  let mapHeight = props.height ? props.height : '300px';

  if (center) {
    return (
      <Map
        google={props.google}
        zoom={15}
        center={center}
        containerStyle={{ height: mapHeight, width: mapWidth, position: 'inherit', borderRadius: 15 }}
        style={{ height: mapHeight, width: mapWidth, position: 'relative', borderRadius: 15 }}
        disableDefaultUI={true}
      >
        <Marker
          position={activeMarker.position}
          animation={activeMarker.animation}
        >
          <InfoWindow>
            <small>
              Click on any of the markers to display an additional info.
            </small>
          </InfoWindow>
        </Marker>
      </Map>);

  }else{
    return (
      <Map
        google={props.google}
        zoom={13}
        initialCenter={{
          lat: 37.8784582,
          lng: -4.7889751
        }}
        containerStyle={{ height: mapHeight, width: mapWidth, position: 'inherit', borderRadius: 15 }}
        style={{ height: mapHeight, width: mapWidth, position: 'relative', borderRadius: 15 }}
        disableDefaultUI={true}
      ></Map>);
  }

}

export default GoogleApiWrapper({
  apiKey: (PARAMS.GOOGLE_API_KEY)
})(MapContainer)
