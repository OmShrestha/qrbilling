import React from 'react';
import Routes from './routers/Router';
import { Router } from 'react-router-dom';
import './App.css';
import history from './history';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
