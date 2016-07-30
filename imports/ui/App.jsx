
import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Circle, GeoJson } from 'react-leaflet';

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
      }
    };
    this.geo_success = this.geo_success.bind(this);
  }

  componentWillMount() {
    this.requestCurrentPosition();
  }

  requestCurrentPosition(){
    if (navigator.geolocation) {
      // let geoloc = navigator.geolocation.getCurrentPosition(this.useGeoData);
      let wpid = navigator.geolocation.watchPosition(this.geo_success,
          this.geo_error, this.state.geo_options);
    }
  }

  geo_success(position) {
    // do_something(position.coords.latitude, position.coords.longitude);
    let geoLocation = [position.coords.latitude, position.coords.longitude];
    this.setState({position: geoLocation});
  }

  geo_error() {
    alert("Sorry, no position available.");
  }

  render() {
    return (
        <Map center={this.state.position} zoom={17}>
          <TileLayer
              url='https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVtb2tlIiwiYSI6ImNpcjlrZDZlNDAxMmNnMm0zbWhiMDFiajMifQ.KHV_MiLfUu3xlsoBg8EbBg'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              detectRetina='true'
          />
          <Marker position={this.state.position}
                  color='red'>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
          <GeoJson data={[
            {
              "type": "Feature",
              "properties": {
                "OBJECTID": 1,
                "TIME": 3,
                "LOCAL_ID": "PT14",
                "TYPE": "dig",
                "COMMENTS": "Multibay Meter (7)",
                "EQNUM": 365906
              },
              "geometry": {
                "type": "Point",
                "coordinates": [
                  147.13308694506316,
                  -41.43901203437661
                ]
              }
            },
            {
      "type": "Feature",
      "properties": {
        "OBJECTID": 1,
        "COMMENTS": "1 St John St",
        "Class": "Multibay Metered",
        "ParkTime_mins": 180,
        "SurveyDate": "2014-02-18T00:00:00.000Z",
        "SignInfo": null,
        "MeterNumber": null,
        "BayNumber": null,
        "DrawingNumber": 822,
        "Mode": "active",
        "ShapeSTArea": 12.2353515625,
        "ShapeSTLength": 15.525986273355237
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              147.13563130153673,
              -41.43291278794401
            ],
            [
              147.13560169230223,
              -41.43286854057252
            ],
            [
              147.13562521085373,
              -41.43285962689575
            ],
            [
              147.13565547895305,
              -41.432904859811806
            ],
            [
              147.13563130153673,
              -41.43291278794401
            ]
          ]
        ]
      }
    }

          ]}>

          </GeoJson>
        </Map>
    );
  }
}
