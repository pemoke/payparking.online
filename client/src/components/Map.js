import React from 'react';
import {GoogleMapLoader, GoogleMap, Polygon} from "react-google-maps";

class Map extends React.Component {
  render() {
    const mapContainer = <div style={{height: '100%', width: '100%'}}/>;
    const mapTypeId = [
        'roadmap',
        'satellite',
        'hybrid',
        'terrain'
    ];

    let obj = this.props.geometry;

    if (!isEmpty(obj)) {
      let polygon = obj.coordinates[0].map((el) => {
        return {
          lng: el[0],
          lat: el[1]
        }
      });

      return (
          <GoogleMapLoader
              containerElement={ mapContainer }
              googleMapElement={
                <GoogleMap
                    zoom={19}
                    center={this.props.center}
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                      mapTypeId: mapTypeId[0]}}
                >
                  <Polygon
                      paths={polygon}
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
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                      mapTypeId: mapTypeId[0]}}
                >
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
