import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

class Map extends React.Component {
  render() {
    const mapContainer = <div style={{height: '100%', width: '100%'}}/>

    return (
        <GoogleMapLoader
            containerElement={ mapContainer }
            googleMapElement={
              <GoogleMap
                  defaultZoom={15}
                  defaultCenter={this.props.center}
                  options={{streetViewControl: false, mapTypeControl: false}}>
                <Marker
                    position={{lat: -41.436213, lng: 147.137192}}
                />
              </GoogleMap>
            }
        />
    )
  }
}

export default Map
