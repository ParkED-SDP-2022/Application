import React, { createContext } from "react";
import "./account.scss";
import { JoystickController } from "../../components/joystick-controller/joystick-controller";
import testMap from "../../assets/map/demo2_map.geojson";
import benches from "../../assets/map/demo2_benches.json";
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
      long: benches.features[0].geometry.coordinates[0],
      lat: benches.features[0].geometry.coordinates[1]
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
                <Map parkBoundaries={testMap} data={benches}  IDhandler={this.handleIDCallback} locHandler={this.handleLocationCallback} center={[0.51,0.61]} bench1Coords={ this.state.bench1loc } className="map"/>
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
