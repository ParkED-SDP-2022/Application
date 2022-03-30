import React, { createContext } from "react";
import "./account.scss";
import { JoystickController } from "../../components/joystick-controller/joystick-controller";
import testMap from "../../assets/map/demo2_map.geojson";
import benches from "../../assets/map/demo2_benches.json";
import Map from "../../components/map/Map";
import Form from "../../components/form/form";
import RosConnection  from "../../components/ros-connection/ros-connection";


export const CoordsContext = createContext({
  coords: 1,
  setCoords: () => {}
});

export class AccountPage extends React.Component{
  ros;

  constructor(props){
    super(props);

    this.gpsCall = this.gpsCall.bind(this);


    this.state = {
      benchID: "",
      location: "",
      bench1loc: {
        long: benches.features[0].geometry.coordinates[0] + 1,
        lat: benches.features[0].geometry.coordinates[1]
      },
    }

    
  }

  componentDidMount() {
    this.ros = new RosConnection();
    this.ros.checkConnection();
  }

  handleIDCallback = (bench) =>{
      this.setState({benchID: bench})
  }

  handleLocationCallback = (loc) =>{
    this.setState({location: loc})
  }

  handleBench1Callback = (loc) =>{
    console.log("loc: " + loc.lat)
    this.setState({bench1loc: {
      long: loc.long,
      lat: loc.lat
    }});
    console.log(this.state)
    this.ros.gps.unsubscribe();
  }

  // When the component is taken out of DOM, we should cancel the connection in this lifecycle method
  componentWillUnmount() {}


  gpsCall = () => {
    this.ros.gps.subscribe(this.handleBench1Callback);
    console.log("setting state")
    var newLoc = {
      long: this.state.bench1loc.long + 0.1,
      lat: this.state.bench1loc.lat,
    }
    this.setState({bench1loc: newLoc});
  }
  
  state = {
    benchID: "",
    location: "",
    bench1loc: {
      long: benches.features[0].geometry.coordinates[0],
      lat: benches.features[0].geometry.coordinates[1]
    },
  }

  updateCoords = () => {
    this.gpsCall()
  }

  getState = () => {
    return this.state.bench1loc;
  }


  render() {
      return(
          <div className='AccountPage'>
              <div className='MapSide'>
                <Map parkBoundaries={testMap} data={benches}  IDhandler={this.handleIDCallback} locHandler={this.handleLocationCallback} updateHandler={ this.updateCoords } center={[0.51,0.61]} getCoords={ this.getState } className="map"/>
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
