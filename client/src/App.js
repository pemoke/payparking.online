import React from 'react';
import Parking from './components/Parking';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
  render() {
    return (
        <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h2>PayParking.online</h2>
            </div>
            <Parking />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
