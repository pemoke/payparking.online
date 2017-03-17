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
    selectedParkingBay: 0
  };

  componentDidMount() {
    this.loadParkingMetersFromServer();
    this.loadParkingBaysFromServer();
  }

  loadParkingMetersFromServer = () => {
    Client.getParkingMeters((success) => {
      console.log('getParkingMeters', success);
      this.setState({
        parkingMeters: success
      });
    })
  };

  loadParkingBaysFromServer = (meter) => {
    if (this.state.parkingMeters.indexOf(meter) > -1) {
      Client.getParkingBays((success) => {
            console.log(success);
            let parkingBayNumbers = success.map((obj) => {
              return obj.properties.baynumber;
            });

            this.setState({
              parkingBays: success,
              parkingBayNumbers: parkingBayNumbers
            });
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
    }, this.getCoordinates);
  };

  handleBayUpdateInput = (event, newValue) => {
    console.log(newValue);
    this.setState({
      selectedParkingBay: parseInt(newValue, 10)
    }, this.getCoordinates);
  };

  getCoordinates = () => {
    if (this.state.selectedParkingMeter && this.state.selectedParkingBay) {
      let coordinates = this.state.parkingBays
          .filter(parkingBay =>
          parkingBay.properties.baynumber === this.state.selectedParkingBay);
      console.log('coordinates', coordinates);
    } else {
      console.log('error');
    }

  };

  render() {
    const location = {
      lat: -41.4333817,
      lng: 147.1263772
    };

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

          <Timer />

          <div style={{width: '100%', height: 300, background: 'lightGrey'}}>
            <Map center={location}/>
          </div>
        </div>
    )
  }
}

export default Parking
