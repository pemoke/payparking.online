import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Circle, GeoJson } from 'react-leaflet';
import merge from 'geojson-merge'

const urlParkingBays = 'http://lcc.launceston.opendata.arcgis.com/datasets/44d22a833b784789911fbd4c3667912f_2.geojson';
const urlParkingMeters = 'http://lcc.launceston.opendata.arcgis.com/datasets/36ad7cc328a44970b68b8d953e23c380_0.geojson';
const urlMapBox = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVtb2tlIiwiYSI6ImNpcjlrZDZlNDAxMmNnMm0zbWhiMDFiajMifQ.KHV_MiLfUu3xlsoBg8EbBg';


// App component - represents the whole app
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      position: [-41.4333496, 147.1263344],
      geo_options: {
        enableHighAccuracy: true,
        maximumAge        : 30000,
        timeout           : 27000
      },
      dataParkingBays: {}
    };
    this.geo_success = this.geo_success.bind(this);
  }

  componentDidMount() {
    this.serverRequest = $.get(urlParkingBays, function (result) {
      console.log('result', result);
      this.setState({
        dataParkingBays: result
      });
    }.bind(this));
  }

  componentWillMount() {
    this.requestCurrentPosition();
    // this.serverRequest.abort();
  }

  requestCurrentPosition(){
    if (navigator.geolocation) {
      let geoloc = navigator.geolocation.watchPosition(this.geo_success,
          this.geo_error, this.state.geo_options);
    }
  }

  geo_success(position) {
    // do_something(position.coords.latitude, position.coords.longitude);
    let geoLocation = [position.coords.latitude, position.coords.longitude];
    this.setState({position: geoLocation});
  }

  geo_error() {
    console.log("Sorry, no position available.");
  }

  render() {
    return (
        <Map center={this.state.position} zoom={18}>
          <TileLayer
              url={urlMapBox}
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              detectRetina='true'
              maxZoom="20"
              maxNativeZoom="18"
          />
          <Marker position={this.state.position}
                  color='red'>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
          <GeoJson
              style={
                {"color": "#D739FF"}
              }
              data={this.state.dataParkingBays}>
            <Popup>
              <span className="popup">
                Parking Bay:<br/>
                {JSON.toString(this)}<br/>
                <button>Pay Parking</button>
              </span>
            </Popup>
          </GeoJson>
        </Map>
    );
  }
}
