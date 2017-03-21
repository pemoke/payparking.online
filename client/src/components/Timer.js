import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Timer extends React.Component {
  state = {
    timerIsRunning: false,
    timer: {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  };

  tick = () => {
    let timerInSeconds = this.state.timer.hours * 60 * 60
        + this.state.timer.minutes * 60
        + this.state.timer.seconds;

    if (timerInSeconds > 0) {
      timerInSeconds--;
      this.setState({
        timer: {
          hours: Math.floor(timerInSeconds / 60 / 60 % 60),
          minutes: Math.floor(timerInSeconds / 60 % 60),
          seconds: Math.floor(timerInSeconds % 60)
        }
      });
    } else {
      this.handleTimerStop();
    }
  };

  handleTimerStart = () => {
    this.setState({timerIsRunning: true});
    this.interval = setInterval(this.tick, 1000);
  };

  handleTimerStop = () => {
    this.setState({timerIsRunning: false});
    clearInterval(this.interval);
  };

  handleTimerHoursChange = (obj, val) => {
    this.setState({
      timer: {
        hours: parseInt(val, 10),
        minutes: this.state.timer.minutes,
        seconds: this.state.timer.seconds
      }
    })
  };

  handleTimerMinutesChange = (obj, val) => {
    this.setState({
      timer: {
        hours: this.state.timer.hours,
        minutes: parseInt(val, 10),
        seconds: this.state.timer.seconds
      }
    })
  };

  handleTimerSecondsChange = (obj, val) => {
    this.setState({
      timer: {
        hours: this.state.timer.hours,
        minutes: this.state.timer.minutes,
        seconds: parseInt(val, 10)
      }
    })
  };

  render() {
    let timerClock = {
      HH: ('0' + this.state.timer.hours).slice(-2),
      MM: ('0' + this.state.timer.minutes).slice(-2),
      SS: ('0' + this.state.timer.seconds).slice(-2)
    };

    if (this.state.timerIsRunning) {
      return (
          <TimerDisplay
              timerIsRunning={this.state.timerIsRunning}
              handleTimerStop={this.handleTimerStop}
              timerClock={timerClock}
          />
      );
    } else {
      return (
          <TimerForm
              timerIsRunning={this.state.timerIsRunning}
              handleTimerStart={this.handleTimerStart}
              handleTimerHoursChange={this.handleTimerHoursChange}
              handleTimerMinutesChange={this.handleTimerMinutesChange}
              handleTimerSecondsChange={this.handleTimerSecondsChange}
              timerClock={timerClock}
          />
      );
    }

  }
}

class TimerForm extends React.Component {
  render() {
    return (
        <div>
          <div style={{display: 'flex', margin: '0 20px'}}>
            <TextField
                style={{flex: '33.3%'}}
                hintText="hours"
                min="0"
                max="12"
                floatingLabelText="hours"
                fullWidth={true}
                value={this.props.timerClock.HH}
                onChange={this.props.handleTimerHoursChange}
                type="number"
            />
            <TextField
                style={{flex: '33.3%', marginLeft: '20px'}}
                hintText="minutes"
                min="0"
                max="59"
                floatingLabelText="minutes"
                fullWidth={true}
                value={this.props.timerClock.MM}
                onChange={this.props.handleTimerMinutesChange}
                type="number"
            />
            <TextField
                style={{flex: '33.3%', marginLeft: '20px'}}
                hintText="seconds"
                min="0"
                max="59"
                floatingLabelText="seconds"
                fullWidth={true}
                value={this.props.timerClock.SS}
                onChange={this.props.handleTimerSecondsChange}
                type="number"
            />
          </div>
          <TimerButton
              timerIsRunning={this.props.timerIsRunning}
              onTimerStart={this.props.handleTimerStart}
          />
        </div>
    )
  }
}

class TimerDisplay extends React.Component {
  render() {
    return (
        <div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1 style={{margin: 0, fontFamily: 'Roboto'}}>
              {this.props.timerClock.HH}
              :
              {this.props.timerClock.MM}
              :
              {this.props.timerClock.SS}
            </h1>
          </div>
          <TimerButton
            timerIsRunning={this.props.timerIsRunning}
            onTimerStop={this.props.handleTimerStop}
          />
        </div>
    )
  }
}

class TimerButton extends React.Component {
  render() {
    if (this.props.timerIsRunning) {
      return (
          <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
            <RaisedButton
                label="Stop"
                secondary={true}
                onClick={this.props.onTimerStop}
            />
          </div>
      )
    } else {
      return (
          <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
            <RaisedButton
                label="Start"
                primary={true}
                onClick={this.props.onTimerStart}
            />
          </div>
      )
    }
  }
}

export default Timer
