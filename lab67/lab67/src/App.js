import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router, NavLink
} from "react-router-dom";
import { React, Component, useState, useEffect, useContext } from 'react';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';

import User from './contexts/User';

import Main from './components/Main'
import Header from './components/Header';

function App() {

  const [user, setUser] = useState(null);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <User.Provider value={{user, setUser}}>
        <Header/>
        <Main/>
      </User.Provider>
    </Router>
  );
}

export default App;
