import React from 'react';
import Parking from './components/Parking';

import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  title: {
    cursor: 'pointer',
  },
};

class App extends React.Component {
  handleTouchTap = () => {
    alert('onTouchTap triggered on the title component');
  };

  render() {
    return (
        <MuiThemeProvider>
          <div className="App">
            <AppBar
                title={<span style={styles.title}>PayParking.online</span>}
                onTitleTouchTap={this.handleTouchTap}
                iconElementLeft={<span></span>}
            />
            <Parking />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
