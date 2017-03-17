import React from 'react';
import Map from './Map';
import Timer from './Timer';
import Client from '../Client';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';

class Parking extends React.Component {
  state = {
    parkingMeters: [],
    selectedParkingMeter: '',
    parkingBays: [],
    parkingBayNumbers: [],
    selectedParkingBay: 0,
    geometry: {},
    location: {
      lat: -41.4333817,
      lng: 147.1263772
    }
  };

  componentDidMount() {
    this.loadParkingMetersFromServer();
    this.loadParkingBaysFromServer();
  }

  loadParkingMetersFromServer = () => {
    Client.getParkingMeters((success) => {
      this.setState({
        parkingMeters: success
      });
    })
  };

  loadParkingBaysFromServer = (meter) => {
    if (this.state.parkingMeters.indexOf(meter) > -1) {
      Client.getParkingBays((success) => {
            let parkingBayNumbers = success.map((obj) => {
              return obj.properties.baynumber;
            });

            this.setState({
              parkingBays: success,
              parkingBayNumbers: parkingBayNumbers,
              selectedParkingMeter: meter
            }, this.getCoordinates);
          },
          meter || '*'
      );
    }
  };

  handleMeterUpdateInput = (searchText) => {
    let parkingMeterNumber = searchText.toUpperCase();
    this.loadParkingBaysFromServer(parkingMeterNumber);
    this.setState({
      selectedParkingMeter: parkingMeterNumber
    });
  };

  handleBayUpdateInput = (event, newValue) => {
    this.setState({
      selectedParkingBay: parseInt(newValue, 10)
    }, this.getCoordinates);
  };

  getCoordinates = () => {
    if (this.state.selectedParkingMeter && this.state.selectedParkingBay) {
      let bayObject = this.state.parkingBays
          .filter(parkingBay =>
          parkingBay.properties.baynumber === this.state.selectedParkingBay);

      if (bayObject.length > 0) {
        let bayObjectGeometry = bayObject[0].geometry;

        this.setState({
          location: {
            lat: bayObjectGeometry.coordinates[0][0][1],
            lng: bayObjectGeometry.coordinates[0][0][0]
          },
          geometry: bayObjectGeometry
        });
      } else {
        // no such parking bay
        this.setState({
          geometry: {}
        })
      }
    } else {
      // no such parking meter
      this.setState({
        geometry: {}
      })
    }
  };

  render() {
    return (
        <div>
          <form>
            <AutoComplete
                hintText="Parking Meter"
                floatingLabelText="Parking Meter"
                searchText={this.state.selectedParkingMeter}
                dataSource={this.state.parkingMeters}
                onUpdateInput={this.handleMeterUpdateInput}
            />
            <span>&nbsp;&mdash;&nbsp;</span>
            <TextField
                hintText="Parking Bay No."
                floatingLabelText="Parking Bay No."
                onChange={this.handleBayUpdateInput}
            />
          </form>
          <Timer geometry={this.state.selectedParkingMeter} />
          <DisplayInfo
              selectedParkingMeter={this.state.selectedParkingMeter}
              location={this.state.location}
          />
          <div style={{width: '100%', height: 300, background: 'lightGrey'}}>
            <Map
                center={this.state.location}
                geometry={this.state.geometry}
            />
          </div>
        </div>
    )
  }
}

class DisplayInfo extends React.Component {
  render() {
    return (
        <div>
          <p>Selected Parking Meter: {this.props.selectedParkingMeter}</p>
          <p>Location: {this.props.location.lat}, {this.props.location.lng}</p>
        </div>
    )
  }
}

export default Parking
