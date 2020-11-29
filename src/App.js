import React from 'react';
import Routes from './routers/Router';
import { Router, Switch } from 'react-router-dom';
import './App.css';
import history from './history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
