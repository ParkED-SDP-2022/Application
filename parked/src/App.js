import logo from './logo.svg';
import './App.css';
import Map from "./components/map/Map";

import {Joystick} from "./components/joystick/joystick";
import {BasicController} from "./pages/basic-controller/basic-controller";

function App() {
  return (
    <div className="App">
      <BasicController/>
    </div>
  );
}

export default App;
