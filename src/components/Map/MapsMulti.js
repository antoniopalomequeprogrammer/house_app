import React, { useState, useEffect } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Button from "@material-ui/core/Button";
import Geocode from "react-geocode";
import PARAMS from "utils/PARAMS";
import InfoWindowEx from "./InfoWindowEx";
import Separador from "assets/img/separador.png";

Geocode.setApiKey(PARAMS.GOOGLE_API_KEY);
Geocode.setLanguage("es");
Geocode.setRegion("es");

// "react-geocode": "^0.2.1",
// "google-maps-react": "^2.0.6",

function MapContainer(props) {

  const [center, setCenter] = useState(null);
  const [activeMarker, setActiveMarker] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const {markers, activeMapId, reservar, classBtn} = props;

  useEffect(() => {

    if (markers) {
      if (activeMapId) {
        let active = markers.find(el => el.id == activeMapId);
        if (active) {
          setCenter({lat: active.position.lat, lng: active.position.lng});
          setActiveId(!activeId ? activeMapId : activeId);
        }else{
          setCenter({lat: markers[0].position.lat, lng: markers[0].position.lng});
        }
      }else{
        setCenter({lat: markers[0].position.lat, lng: markers[0].position.lng});
      }
    }

  }, [markers]);


  const onMarkerClick = (props, marker) =>{
    setActiveMarker(marker)
    setActiveId(props.id);
    setSelectedPlace(props.data)
    setShowingInfoWindow(true)
  }

  const onInfoWindowClose = () =>{
    setActiveMarker(null)
    setActiveId(null)
    setShowingInfoWindow(false)
  }

  const onMapClicked = () => {
    if (showingInfoWindow){
      setActiveMarker(null)
      setActiveId(null)
      setShowingInfoWindow(false)
    }
  }

  let mapWidth = '100%';
  let mapHeigth = 600;

  return (
    <Map
      google={props.google}
      zoom={14}
      center={center}
      containerStyle={{ height: mapHeigth, width: mapWidth, position: 'inherit', borderRadius: 15 }}
      style={{ height: mapHeigth, width: mapWidth, position: 'relative', borderRadius: 15 }}
      disableDefaultUI={true}
    >
      {markers.map(function(marker, i) {
        return (<Marker
          onClick={onMarkerClick}
          active={marker.active}
          id={marker.id}
          data={marker.data}
          position={marker.position}
          animation={(activeId && activeId == marker.id) ? props.google.maps.Animation.BOUNCE : null}
        />);
      })}

      <InfoWindowEx
        marker={activeMarker}
        onClose={onInfoWindowClose}
        visible={showingInfoWindow}>
        <div id="caja-info-mapa">
          {selectedPlace.empresa_icon && <img class="logo-club" src={selectedPlace.empresa_icon} style={{width: `auto`, maxHeight: 60}}/>}
          <h1 class="titulo-club">{selectedPlace.nombre}</h1>
          <img src={Separador} style={{marginBottom: `15px`}}/>
          <p class="direccion-club">{selectedPlace.empresa_direccion}</p>
          <p>
            <Button className={classBtn} variant="contained" onClick={(e)=>{
              reservar(activeId);
            }}>
              Visitar club
            </Button>
          </p>
        </div>
      </InfoWindowEx>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: (PARAMS.GOOGLE_API_KEY)
})(MapContainer)
