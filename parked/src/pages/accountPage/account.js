import React, { createContext } from "react";
import "./account.scss";

// Data
import real_map_boundaries from "../../assets/map/demo2_map.geojson";
import real_benches from "../../assets/map/demo2_benches.json";
import fake_map_boundaries from "../../assets/map/test.geojson";
import fake_benches from "../../assets/map/benches.json";
import heatmap_data from '../../assets/map/data.geojson';
import fake_heatmap_data from '../../assets/map/fake_data.geojson';

// Components
import Map from "../../components/map/Map";
import Form from "../../components/form/form";
import RosConnection  from "../../components/ros-connection/ros-connection";
import { JoystickController } from "../../components/joystick-controller/joystick-controller";


export class AccountPage extends React.Component{
  ros;

  constructor(props){
    super(props);
    this.handleLive=this.handleLive.bind(this)
  }
  
  // The page state which tracks data for sharing with child components
  state = {
    realMap: true,
    benchID: "",
    location: "",
    benchcoords: {},
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
      this.setState({benchID: bench});
  }

  // A handler to get the coordinates of a position on the map when a marker is dragged there
  handleNewLocationCallback = (loc) =>{
    this.setState({location: loc});
  }

  
  /*** Ros Subscription and Map Updating ***/

  // updateState updates the parent component state so the map can access updates fields
  updateState = () => {
    console.log("updating state");
    this.ros.benchlocs.subscribe(this.handleBenchCoordsCallback);
    this.ros.heatmap.subscribe(this.handleHeatmapCallback);
  }

  // The callback for a ros subscriber which gets updated bench coordinates
  handleBenchCoordsCallback = (data) =>{
    this.setState({benchcoords: JSON.parse(data)});
    this.ros.benchlocs.unsubscribe();
  }
  
  // The callback for a ros subscription which gets updated heatmap points
  handleHeatmapCallback = (data) =>{
    this.setState({heatmap: JSON.parse(data)});
    this.ros.heatmap.unsubscribe();
  }

  // method which allows Map component to recieve updated states
  getCoords = () => {
    console.log("getting coords");
    return this.state.benchcoords;
  }

  // method which allows Map component to recieve updated states
  getHeatMap = () => {
    console.log("returning heatmap");
    return this.state.heatmap;
  }


  /*** Render a different map depending on need ***/

  handleLive() {
    console.log("Handling")
    if (this.state.realMap == true) {
      this.setState({realMap: false});
    } else {
      this.setState({realMap: true});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update")
}

  render() {
    console.log(this.state.realMap);
    let map;
    if (this.state.realMap) {
      console.log("making real map");
      map = <Map parkBoundaries={real_map_boundaries} benchData={real_benches}  heatmapData={heatmap_data} IDhandler={this.handleIDCallback} locHandler={this.handleNewLocationCallback} updateHandler={this.updateState} center={[0.51,0.61]} bounds={[[-0.1044,	-0.1923],[1.4171,	1.3085]]} getCoords={this.getCoords} getHeatMap={this.getHeatMap} live={true} className="map"/>;
    } else {
      console.log("making fake map");
      map = <Map parkBoundaries={fake_map_boundaries} benchData={fake_benches}  heatmapData={fake_heatmap_data} IDhandler={this.handleIDCallback} locHandler={this.handleNewLocationCallback} center={[-3.197,55.941]} bounds={[[-3.1939,55.9427],[-3.2008,55.94]]} live={false} className="map"/>;
    }

      return(
          <div className='AccountPage'>
          <nav className="menu"></nav>
          <button className="menu" onClick={this.handleLive}>Live Map</button>
              <div className='MapSide'>
                { map } 
              </div>
            
            <div className="cs-background" />
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
