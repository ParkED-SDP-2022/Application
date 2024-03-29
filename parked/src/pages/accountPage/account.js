import React, { createContext } from "react";
import "./account.scss";

// Data
import real_map_boundaries from "../../assets/map/demo2_map.geojson";
import real_benches from "../../assets/map/demo2_benches.json";
import fake_map_boundaries from "../../assets/map/test.geojson";
import fake_benches from "../../assets/map/benches.json";
import heatmap_data from '../../assets/map/data.json';
import fake_heatmap_data from '../../assets/map/fake_data.json';

// Components
import Map from "../../components/map/Map";
import Form from "../../components/form/form";
import RosConnection  from "../../components/ros-connection/ros-connection";
import { JoystickController } from "../../components/joystick-controller/joystick-controller";


export class AccountPage extends React.Component{
  ros;

  constructor(props){
    super(props);
    this.handleLive=this.handleLive.bind(this);
    this.handleOldLocationCallback=this.handleOldLocationCallback.bind(this);
  }
  
  // The page state which tracks data for sharing with child components
  state = {
    realMap: false,
    benchID: "",
    location: "",
    benchcoords: {},
    heatmap: {}
  }

  // Setup the ros connection upon mountings
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

  // A handler to get the coordinates of a position on the map when a marker is dragged there
  handleOldLocationCallback = (loc) =>{
    this.setState({old_location: loc});
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
    console.log("callback for benchcoords: " + data.data);
    this.setState({benchcoords: JSON.parse(data.data)});
    //this.ros.benchlocs.unsubscribe();
  }
  
  // The callback for a ros subscription which gets updated heatmap points
  handleHeatmapCallback = (data) =>{
    console.log("calling back heatmap");
    console.log(data.data);
    this.setState({heatmap: JSON.parse(data.data)});
    //this.ros.heatmap.unsubscribe();
    console.log(this.state.heatmap);
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
      this.setState({heatmap: fake_heatmap_data});
    } else {
      this.setState({realMap: true});
      this.setState({heatmap: heatmap_data});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update")
}

  render() {
  var content = {
      inputs: [
          {
              label: 'Bench Number',
              name: 'bench_num',
              val: this.state.benchID,
          },
          {
              label: 'Old Location',
              name: 'loc',
              val: this.state.old_location,
          },
          {
              label: 'New Location',
              name: 'loc',
              val: this.state.location,
          },
      ],
    };
    console.log(this.state.realMap);
    let map;
    if (this.state.realMap) {
      console.log("making real map");
      map = <Map parkBoundaries={real_map_boundaries} benchData={real_benches}  heatmap_data={heatmap_data} IDhandler={this.handleIDCallback} locHandler={this.handleNewLocationCallback} oldLocHandler={this.handleOldLocationCallback} updateHandler={this.updateState} center={[0.51,0.61]} bounds={[[-0.1044,	-0.1923],[1.4171,	1.3085]]} getCoords={this.getCoords} getHeatMap={this.getHeatMap} live={true} className="map"/>;
    } else {
      console.log("making fake map");
      console.log(fake_heatmap_data);
      map = <Map parkBoundaries={fake_map_boundaries} benchData={fake_benches}  heatmap_data={fake_heatmap_data} IDhandler={this.handleIDCallback} locHandler={this.handleNewLocationCallback} oldLocHandler={this.handleOldLocationCallback} center={[-3.197,55.941]} bounds={[[-3.1939,55.9427],[-3.2008,55.94]]} live={false} className="map"/>;
    }

      return(
          <div className='AccountPage'>
              <div className='MapSide'>
                <div className="map-menu" id="menu-parent">
                  <nav className="menu" id="menu"></nav>
                  <nav className="menu menu-left" onClick={this.handleLive}><a id="live-map" href="#">Live Map</a></nav>
                </div>
                { map } 
              </div>
            
            <div className="cs-background" />
            <div className='ControlSide'>
                <div className="MoveForm">
                    <Form benchID={this.state.benchID} loc={this.state.location} content={content}/>
                </div>
                <div className="Joystick">
                  <JoystickController/>
                </div>
            </div>
        </div>
      )
  }
}
