import logo from './logo.svg';
import './App.css';
import Map from "./components/map/Map";
import React from "react";

import {BasicController} from "./pages/basic-controller/basic-controller";
import {JoystickController} from "./components/joystick-controller/joystick-controller";

function App() {
  return (
    <div className="App">
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <img src={require('./assets/branding/logo.png')} className='logo'/>
        <BasicController/>
      </div>
    </div>
  );
}

export default App;
