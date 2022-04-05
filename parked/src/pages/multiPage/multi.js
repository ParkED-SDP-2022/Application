import React, { createContext } from "react";
import "./multi.scss";

// Data
import real_map_boundaries from "../../assets/map/demo2_map.geojson";
import real_benches from "../../assets/map/demo2_benches.json";
import fake_map_boundaries from "../../assets/map/test.geojson";
import fake_benches from "../../assets/map/benches.json";
import heatmap_data from '../../assets/map/data.json';
import fake_heatmap_data from '../../assets/map/fake_data.json';

// Components
import Map from "../../components/multimap/Multimap";
import Form from "../../components/form/form";


export class MultiPage extends React.Component{

  constructor(props){
    super(props);
    this.handleLive=this.handleLive.bind(this)
    this.handleReset=this.handleReset.bind(this)
  }
  
  // The page state which tracks data for sharing with child components
  state = {
    reset: false,
    realMap: false,
    locations: [],
    benches_set: []
  }

  /*** Form Auto Filling from Map ***/

  // A handler to get the coordinates of a position on the map when a marker is dragged there
  handleNewLocationCallback = (id, loc) =>{

    const index = this.state.benches_set.indexOf(id);
    if (index > -1) {
      this.state.benches_set.splice(index, 1); 
      this.state.locations.splice(index, 1); 
    }
    this.setState({locations: [...this.state.locations, loc],
      benches_set: [...this.state.benches_set, id]});
    console.log(this.state);
  }


  /*** Render a different map depending on need ***/

  handleLive() {
    console.log("Swapping Map")
    if (this.state.realMap == true) {
      this.setState({realMap: false});
    } else {
      this.setState({realMap: true});
    }
  }

  handleReset() {
    console.log("Resetting Pins");
    console.log(this.state.reset);
    this.setState({reset: !this.state.reset});
    this.setState({locations: []});
    this.setState({benches_set: []});
  }


  render() {
    console.log(this.state.realMap);
    let map;
    if (this.state.realMap) {
      map = <Map parkBoundaries={real_map_boundaries} benchData={real_benches} locHandler={this.handleNewLocationCallback} center={[0.51,0.61]} bounds={[[-0.1044,	-0.1923],[1.4171,	1.3085]]} live={true} reset={this.state.reset} className="map"/>;
    } else {
      map = <Map parkBoundaries={fake_map_boundaries} benchData={fake_benches} locHandler={this.handleNewLocationCallback} center={[-3.197,55.941]} bounds={[[-3.1939,55.9427],[-3.2008,55.94]]} live={false}  reset={this.state.reset} className="map"/>;
    }

    var content = {
          inputs: [],
      };

      var i = 0;
      for (const b in this.state.locations) {
        console.log(this.state.locations);
        console.log(b);
        content.inputs.push({
          label: 'Bench ' + this.state.benches_set[i],
          name: 'loc',
          val: this.state.locations[b]
        })
        
        i = i+1;
      }
      return(
          <div className='AccountPage'>
              <div className='MapSide'>
                <div className="map-menu" id="menu-parent">
                  <nav className="menu" onClick={this.handleReset}><a id="live-map" href="#">Reset Locations</a></nav>
                  <nav className="menu menu-left" onClick={this.handleLive}><a id="live-map" href="#">Live Map</a></nav>
                </div>
                { map } 
              </div>
            
            <div className="cs-background" />
            <div className='ControlSide'>
                <div className="MoveForm">
                    <Form benchID={this.state.benchID} loc={this.state.location} content={ content }/>
                </div>
            </div>
        </div>
      )
  }
}
