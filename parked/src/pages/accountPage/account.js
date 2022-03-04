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
   }

handleIDCallback = (bench) =>{
    this.setState({benchID: bench})
}

handleLocationCallback = (loc) =>{
  this.setState({location: loc})
}

  render() {
      return(
          <div className='AccountPage'>
              <div className='MapSide'>
                <Map parkBoundaries={testMap} benches={benches}  IDhandler={this.handleIDCallback} locHandler={this.handleLocationCallback} center={[-3.197310, 55.941542]} className="map"/>
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
