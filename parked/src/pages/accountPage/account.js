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
  }
  
  // The page state which tracks data for sharing with child components
  state = {
    benchID: "",
    location: "",
    bench1loc: {
      long: benches.features[0].geometry.coordinates[0],
      lat: benches.features[0].geometry.coordinates[1]
    },
    heatmap: {}
  }

  // Setup the ros connection upon mounting
  //TODO: unmount at the end?
  componentDidMount() {
    this.ros = new RosConnection();
    this.ros.checkConnection();
  }


  /*** Form Auto Filling from Map ***/

  // A handler used to get the ID of a clicked bench from the map component
  handleIDCallback = (bench) =>{
      this.setState({benchID: bench})
  }

  // A handler to get the coordinates of a position on the map when a marker is dragged there
  handleNewLocationCallback = (loc) =>{
    this.setState({location: loc})
  }

  
  /*** Ros Subscription and Map Updating ***/

  // updateState updates the parent component state so the map can access updates fields
  updateState = () => {
    this.ros.gps.subscribe(this.handleBenchCoordsCallback);
    this.ros.heatmap.subscribe(this.handleHeatmapCallback);
  }

  // The callback for a ros subscriber which gets updated bench coordinates
  handleBenchCoordsCallback = (loc) =>{
    //console.log("loc: " + loc.lat)
    this.setState({bench1loc: {
      long: loc.long,
      lat: loc.lat
    }});
    console.log(this.state)
    this.ros.gps.unsubscribe();
  }
  
  // The callback for a ros subscription which gets updated heatmap points
  handleHeatmapCallback = (data) =>{
    this.setState({heatmap: JSON.parse(data)});
    this.ros.heatmap.unsubscribe();
  }

  // method which allows Map component to recieve updated states
  getCoords = () => {
    return this.state.bench1loc;
  }

  // method which allows Map component to recieve updated states
  getHeatMap = () => {
    return this.state.heatmap;
  }


  render() {
      return(
          <div className='AccountPage'>
              <div className='MapSide'>
                <nav id="menu"></nav>
                <Map parkBoundaries={testMap} data={benches}  IDhandler={this.handleIDCallback} locHandler={this.handleNewLocationCallback} updateHandler={ this.updateState } center={[0.51,0.61]} getCoords={ this.getCoords } getHeatmap={this.getHeatMap} className="map"/>
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
