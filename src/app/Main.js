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
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      btnStartStopLabel: 'Start'
    };
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
      btnStartStopLabel: 'Stop'
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>PayParking.online</h1>
          <h2>Mobile payment for parking</h2>
          <ParkingAllocation />
          <Timer />
          <TimerActionButton
              btnStartStopLabel={this.state.btnStartStopLabel} />
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
  componentDidMount() {
    // this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
    var timer = moment.duration(5, "seconds").timer({loop: true}, function() {
      // Callback
      console.log('timer');
    });

  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartClick = () => {
    this.props.onStartClick(this.props.id);
  };

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  };

  render() {
    // const elapsedString = helpers.renderElapsedString(
    //   this.props.elapsed, this.props.runningSince
    // );
    console.log(moment.isDate('10/10/2017'));
    return (
      <div>
        <p>elapsedString</p>
        <TextField
          hintText="HH"
          maxLength="2"
          style={{width: '2em'}}
        />
        &nbsp;:&nbsp;
        <TextField
          hintText="MM"
          maxLength="2"
          style={{width: '2em'}}
        />
        &nbsp;:&nbsp;
        <TextField
          hintText="SS"
          maxLength="2"
          style={{width: '2em'}}
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
              onTouchTap={this.handleTouchTap}
          />
      )
    } else {
      return (
          <RaisedButton
              label='Start'
              secondary={true}
              onTouchTap={this.handleTouchTap}
          />
      )
    }
  };
}
