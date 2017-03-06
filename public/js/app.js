class PayParkingDashboard extends React.Component {
  render() {
    return (
        <div>
          <ParkingAllocation />
          <Timer
            timerIsRunning={false}
          />
          <TimerButton
            timerIsRunning={false}
          />
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
  render() {
    if (this.props.timerIsRunning) {
      return (
          <TimerDisplay />
      );
    } else {
      return (
          <TimerForm />
      );
    }
  }
}

class TimerForm extends React.Component {
  render() {
    return (
        <form>
          <input type="number" min="0" max="12" />
          <input type="number" min="0" max="59" />
          <input type="number" min="0" max="59" />
        </form>
    )
  }
}

class TimerDisplay extends React.Component {
  render() {
    return (
        <div>
          HH : MM : SS
        </div>
    )
  }
}

class TimerButton extends React.Component {
  render() {
    const timerButtonText = this.props.timerIsRunning ? 'Stop' : 'Start';
    return (
        <div>
          <button>{timerButtonText}</button>
        </div>
    )
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
