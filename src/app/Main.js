/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import moment from 'moment';
import 'moment-timer';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    timer: ''
  };

  handleTimer = moment.duration(1, "seconds").timer({loop: true}, () => {
    let t = this.state.timer--;
    this.setState({
      timer: t
    });
    console.log(this.state);
  // Callback
  });

  handleTimerStart = () => {
    this.handleTimer.start();
    console.log(this.handleTimer.isStopped());
    this.setState({
      timerIsRunning: true,
      timer: Date.now()
    })
  };

  handleTimerStop = () => {
    this.handleTimer.stop();
    console.log(this.handleTimer.isStopped());
    this.setState({
      timerIsRunning: false,
      timer: ''
    })
  };

  handleMMchange = (e) => {
    let mm = parseInt(e.target.value) * 60;
    this.setState({
      timer: mm
    })
  };

  componentDidMount() {
    // this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
    let state = this.state;

  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartClick = () => {
    console.log(this.id);
    this.props.onStartClick(this.props.id);
  };

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  };

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
        />
        &nbsp;:&nbsp;
        <TextField
          hintText="MM"
          maxLength="2"
          style={{width: '2em'}}
          type="number"
          onChange={this.handleMMchange}
        />
        &nbsp;:&nbsp;
        <TextField
          hintText="SS"
          maxLength="2"
          style={{width: '2em'}}
          type="number"
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
