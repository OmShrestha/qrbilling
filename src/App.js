import React from 'react';
import Routes from './routers/Router';
import { Router } from 'react-router-dom';
import './App.css';
import history from './history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
          <Routes />
      </Router>
    </div>
  );
}

export default App;
