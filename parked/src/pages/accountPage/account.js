import React, { createContext } from "react";
import "./account.scss";
import { JoystickController } from "../../components/joystick-controller/joystick-controller";
import testMap from "../../assets/map/test.geojson";
import benches from "../../assets/map/benches.geojson";
import Map from "../../components/map/Map";
import Form from "../../components/form/form";

export const CoordsContext = createContext({
  coords: 1,
  setCoords: () => {}
});

export class AccountPage extends React.Component{

  state = {
    benchID: "",
    location: "",
    bench1loc: {
      'long': -3.1974862648010254,
      'lat': 55.94221660994057
    },
   }

handleIDCallback = (bench) =>{
    this.setState({benchID: bench})
}

handleLocationCallback = (loc) =>{
  this.setState({location: loc})
}

handleBench1Callback = (loc) =>{
  this.setState({bench1loc: loc})
}

//this.ros = new RosConnection();
//this.ros.listenForGPS(handleBench1Callback)

  render() {
      return(
          <div className='AccountPage'>
              <div className='MapSide'>
                <Map parkBoundaries={testMap} benches={benches}  IDhandler={this.handleIDCallback} locHandler={this.handleLocationCallback} center={[-3.197310, 55.941542]} bench1Coords={ this.state.bench1loc } className="map"/>
              </div>
            <div className='ControlSide'>
                <div className="MoveForm">
                    <Form benchID={this.state.benchID} loc={this.state.location}/>
                </div>
                <div className="Joystick">
                  <JoystickController/>
                </div>
            </div>
        </div>
      )
  }
}
