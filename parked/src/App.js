import logo from './logo.svg';
import './App.css';
import Map from "./components/map/Map";

import {BasicController} from "./pages/basic-controller/basic-controller";
import {JoystickController} from "./components/joystick-controller/joystick-controller";

function App() {
  return (
    <div className="App">
      <BasicController/>
    </div>
  );
}

export default App;
