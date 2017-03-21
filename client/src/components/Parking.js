import React from 'react';
import Map from './Map';
import Timer from './Timer';
import Client from '../Client';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import {Card, CardText} from 'material-ui/Card';

class Parking extends React.Component {
  state = {
    parkingMeters: [],
    selectedParkingMeter: '',
    parkingBays: [],
    parkingBayNumbers: [],
    selectedParkingBay: 0,
    geometry: {},
    center: {
      lat: -41.4333817,
      lng: 147.1263772
    },
    parkingMeterObj: {}
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
        this.setState({
          parkingMeterObj: bayObject[0],
          center: {
            lat: bayObject[0].geometry.coordinates[0][0][1],
            lng: bayObject[0].geometry.coordinates[0][0][0]
          },
          geometry: bayObject[0].geometry
        });
      } else {
        // no such parking bay
        this.setState({
          parkingMeterObj: {},
          geometry: {}
        })
      }
    } else {
      // no such parking meter
      this.setState({
        parkingMeterObj: {},
        geometry: {}
      })
    }
  };

  render() {
    const styles = {
      parkingMeter: {
        root: {
        },
        container: {
          display: 'flex',
          margin: '10px 20px',
          left : {
            flex: '66.67%'
          },
          right: {
            flex: '33.33%',
            marginLeft: '21px'
          }
        },
        textField: {
          fontSize: 21
        },
        list: {
          maxHeight: 200,
          fontSize: 21,
        }
      },
      bayNo: {
        fontSize: 21
      }
    };

    return (
        <div>
          <div style={styles.parkingMeter.container}>
            <div style={styles.parkingMeter.container.left}>
              <AutoComplete
                  hintText="Parking Meter"
                  floatingLabelText="Parking Meter"
                  style={styles.parkingMeter.root}
                  fullWidth={true}
                  textFieldStyle={styles.parkingMeter.textField}
                  listStyle={styles.parkingMeter.list}
                  menuStyle={styles.parkingMeter.menu}
                  searchText={this.state.selectedParkingMeter}
                  dataSource={this.state.parkingMeters}
                  onUpdateInput={this.handleMeterUpdateInput}
              />
            </div>
            <div style={styles.parkingMeter.container.right}>
              <TextField
                  hintText="Bay No."
                  floatingLabelText="Bay No."
                  style={styles.bayNo}
                  fullWidth={true}
                  textareaStyle={styles.bayNo}
                  onChange={this.handleBayUpdateInput}
                  type="number"
              />
            </div>
          </div>
          <div style={{margin: '0 80px'}}>
            <Timer geometry={this.state.selectedParkingMeter} />
          </div>
          <div>
            <DisplayParkingMeterInfo
                parkingMeterObj={this.state.parkingMeterObj}
                location={this.state.center}
            />
          </div>
          <div style={{width: '100%', height: 300, background: 'lightGrey'}}>
            <Map
                center={this.state.center}
                geometry={this.state.geometry}
            />
          </div>
        </div>
    )
  }
}

class DisplayParkingMeterInfo extends React.Component {
  render() {
    if (this.props.parkingMeterObj.properties) {
      return (
          <Card style={{fontSize: '11px', color: 'grey', textAlign: 'center'}}>
            <CardText>
              <strong>Meter info:</strong>
              <br />
              Time limit: {this.props.parkingMeterObj.properties.parktime_mins} min.
              <br />
              {this.props.parkingMeterObj.properties.signinfo}
              <br />
              {this.props.parkingMeterObj.properties.comments}
            </CardText>
          </Card>
      )
    } else {
      return null
    }
  }
}

export default Parking
