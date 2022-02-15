import logo from './logo.svg';
import './App.css';
import Map from "./components/map/Map";
import React from "react";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';

import { BasicController } from "./pages/basic-controller/basic-controller";
import { JoystickController } from "./components/joystick-controller/joystick-controller";
//navigator
import Navigator from "./pages/navigator";
//home
import Home from "./pages/home";
//signup
import Signup from "./pages/signup";
//login
import Login from "./pages/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigator></Navigator>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
        </Switch>
      </Router>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <img src={require('./assets/branding/logo.png')} className='logo' />
        <BasicController />
      </div>
    </div>
  );
}

export default App;
