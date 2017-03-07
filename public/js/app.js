class PayParkingDashboard extends React.Component {
  render() {
    return (
        <div>
          <ParkingAllocation />
          <Timer />
          <Map />
        </div>
    )
  }
}

class ParkingAllocation extends React.Component {
  render() {
    return (
        <form>
          <input type="text" />
          <input type="text" />
        </form>
    )
  }
}

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
    this.setState({ timerIsRunning: true });
    this.interval = setInterval(this.tick, 1000);
  };

  handleTimerStop = () => {
    this.setState({ timerIsRunning: false });
    clearInterval(this.interval);
  };

  handleTimerChange = (e) => {
    if (e.target.name === 'hours') {
      this.setState({
        timer: {
          hours: parseInt(e.target.value),
          minutes: this.state.timer.minutes,
          seconds: this.state.timer.seconds
        }
      })
    } else if (e.target.name === 'minutes') {
      this.setState({
        timer: {
          hours: this.state.timer.hours,
          minutes: parseInt(e.target.value),
          seconds: this.state.timer.seconds
        }
      })
    } else if (e.target.name === 'seconds') {
      this.setState({
        timer: {
          hours: this.state.timer.hours,
          minutes: this.state.timer.minutes,
          seconds: parseInt(e.target.value)
        }
      })
    }
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
            handleTimerChange={this.handleTimerChange}
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
          <input
              type="number"
              name="hours"
              min="0"
              max="12"
              defaultValue={this.props.timerClock.HH}
              onChange={this.props.handleTimerChange}
          />
          <input
              type="number"
              name="minutes"
              min="0"
              max="59"
              defaultValue={this.props.timerClock.MM}
              onChange={this.props.handleTimerChange}
          />
          <input
              type="number"
              name="seconds"
              min="0"
              max="59"
              defaultValue={this.props.timerClock.SS}
              onChange={this.props.handleTimerChange}
          />
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
          {this.props.timerClock.HH}
          :
          {this.props.timerClock.MM}
          :
          {this.props.timerClock.SS}
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
          <div>
            <button
                onClick={this.props.onTimerStop}
            >
              Stop
            </button>
          </div>
      )
    } else {
      return (
          <div>
            <button
                onClick={this.props.onTimerStart}
            >
              Start
            </button>
          </div>
      )
    }
  }
}

class Map extends React.Component {
  render() {
    return (
        <div>
          Map
        </div>
    )
  }
}

ReactDOM.render(
    <PayParkingDashboard />,
    document.getElementById('content')
);
