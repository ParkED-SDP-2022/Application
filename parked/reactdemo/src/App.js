import logo from './assets/images/logo.svg';
import './assets/css/App.css';

import Home from './components/Home'
import News from './components/News'
import Home2 from './components/Home2';
import Map from './components/Map';

function App() {
  return (
    <div className="App"> 
      Parked
      <hr/>
      {/* hello react    root component
      <Home/>
      <News/>
      <Home2/> */}
      <Map/>
    </div>
  );
}

export default App;
