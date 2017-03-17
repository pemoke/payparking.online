import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

class Map extends React.Component {
  render() {
    const mapContainer = <div style={{height: '100%', width: '100%'}}/>;
    let obj = this.props.geometry;

    if (!isEmpty(obj)) {
      return (
          <GoogleMapLoader
              containerElement={ mapContainer }
              googleMapElement={
                <GoogleMap
                    zoom={19}
                    center={this.props.center}
                    options={{streetViewControl: false, mapTypeControl: false}}>
                  <Marker
                      position={this.props.center}
                  />
                </GoogleMap>
              }
          />
      )
    } else {
      return (
          <GoogleMapLoader
              containerElement={ mapContainer }
              googleMapElement={
                <GoogleMap
                    zoom={13}
                    center={{
                      lat: -41.4333817,
                      lng: 147.145
                    }}
                    options={{streetViewControl: false, mapTypeControl: false}}>
                </GoogleMap>
              }
          />
      )
    }
  }
}

function isEmpty(obj) {
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

export default Map
