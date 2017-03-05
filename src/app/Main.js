/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ParkingMeters from 'json!./Parking_Meters.geojson';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '2em',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>PayParking.online</h1>
          <h2>Mobile payment for parking</h2>
          <ParkingAllocation />
          <Timer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;

class ParkingAllocation extends Component {
  constructor(props) {
    super(props);
    // let parkingMeters = require('!json!./Parking_Meters.geojson');
    console.log(JSON.stringify(ParkingMeters));
  }


  render() {
    return (
      <div>
        <TextField
          hintText="e.g.: GE03"
          floatingLabelText="Parking Meter Number"
        />
        &nbsp;
        <TextField
          hintText="e.g.: 2"
          floatingLabelText="Parking Bay Number"
        />
      </div>
    )
  }
}

class Timer extends Component {
  state = {
    timerIsRunning: false,
    timer: 0
  };

  tick = () => {
    this.setState({timer: this.state.timer - 1});
    console.log(this.state.timer);
    if (this.state.timer <=0) {
      clearInterval(this.interval);
    }
  };

  handleTimerStart = () => {
    console.log(this.state.timer);
    this.setState({
      timerIsRunning: true,
    });
    this.interval = setInterval(this.tick, 1000);
  };

  handleTimerStop = () => {
    this.setState({
      timerIsRunning: false,
    });
    clearInterval(this.interval);
  };

  handleTimerChange = (e) => {
    let seconds = parseInt(e.target.value) * 60;
    this.setState({
      timer: seconds
    })
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <p>elapsedString</p>
        <TextField
          hintText="HH"
          maxLength="2"
          style={{width: '2em'}}
          type="number"
          value={('0' + Math.floor(this.state.timer / 60 / 60 % 60)).slice(-2)}
        />
        &nbsp;:&nbsp;
        <TextField
          name="minutes"
          hintText="MM"
          maxLength="2"
          style={{width: '2em'}}
          type="number"
          value={('0' + Math.floor(this.state.timer / 60 % 60)).slice(-2)}
          onChange={this.handleTimerChange}
        />
        &nbsp;:&nbsp;
        <TextField
          hintText="SS"
          maxLength="2"
          style={{width: '2em'}}
          type="number"
          value={('0' + this.state.timer % 60).slice(-2)}
        />
        <TimerActionButton
          timerIsRunning={this.state.timerIsRunning}
          onTimerStart={this.handleTimerStart}
          onTimerStop={this.handleTimerStop}
        />
      </div>
    )
  }
}

class TimerActionButton extends React.Component {
  render() {
    if (this.props.timerIsRunning) {
      return (
          <RaisedButton
              label='Stop'
              secondary={true}
              onTouchTap={this.props.onTimerStop}
          />
      )
    } else {
      return (
          <RaisedButton
              label='Start'
              secondary={true}
              onTouchTap={this.props.onTimerStart}
          />
      )
    }
  };
}
