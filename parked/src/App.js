import logo from './logo.svg';
import './App.css';
import Map from "./components/map/Map";
import {Joystick} from "./components/joystick/joystick";
import { basicController } from './pages/basic-controller/basic-controller';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <basicController>

      </basicController>
    </div>
  );
}

export default App;
