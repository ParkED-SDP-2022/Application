/**
 * Defining a map functional component to use in our website
 * Sources: 
 * https://dev.to/laney/react-mapbox-beginner-tutorial-2e35
 * https://docs.mapbox.com/mapbox-gl-js/example/multiple-geometries/
 * https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/
 * 
 * https://docs.mapbox.com/mapbox-gl-js/example/geojson-markers/
 * https://www.lostcreekdesigns.co/writing/how-to-create-a-map-popup-component-using-mapbox-and-react/
 * 
 * https://docs.mapbox.com/mapbox-gl-js/example/live-geojson/
 * 
 * Currently a temporary "dummy" map which centres on george square
 * 
 * TODO: load in and render geojson data
 * TODO: stop from zooming? or havea  reset view button?
 * TODO: dynamically zoom to data?
 */

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
import './map.scss';
import markerImg from '../../assets/map/marker2.png';

import '../../App.css';
import data from '../../assets/map/benches.json'

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbHlvaWciLCJhIjoiY2t6NXRxN3NpMDJnYjJxbXBzMTRzdDU1MSJ9.NHGShZvAfR27RnylGIP0mA';


const Popup = ({ benchName, battery, inUse }) => (
  <div className="popup bench-marker">
    <div className="bench-metric-row">
      <h4 className="row-title">Bench Number:</h4>
      <div className="row-value">{benchName}</div>
    </div>
    <div className="bench-metric-row">
      <h4 className="row-title">Status:</h4>
      <div className="row-value">{inUse ? "Occupied" : "Unoccupied"}</div>
    </div>
    <div className="bench-metric-row">
      <h4 className="row-title">Current Battery Power:</h4>
      <div className="row-value">{battery}%</div>
    </div>
  </div>
)


const Map = ( { parkBoundaries, benches, IDhandler, locHandler, center, bench1Coords } ) => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))

  const geojson = data
  console.log(geojson)

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      //west-end of the meadows
      center: center,
      zoom: 16,
      interactive: true
    });
  
    function onDragEnd() {
      const lngLat = marker.getLngLat();
      locHandler(lngLat)
    }
  
    const marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat(center)
      .addTo(map);

    marker.on('dragend', onDragEnd);

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    map.on('load', () => {
      map.resize();

      map.loadImage(
        markerImg,
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage('marker', image);
        });      

      map.addSource('park', {
        'type': 'geojson',
        'data': parkBoundaries //test file of boundaries
        });
      map.addLayer({
        'id': 'park-boundary',
        'type': 'line',
        'source': 'park',
        'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
          },
        'paint': {
          'line-color': 'black',
          'line-width': 3
          },
        'filter': ['==', '$type', 'LineString']
      });


      // Add a data source containing benches.
      map.addSource('benches', {
        'type': 'geojson',
        'data': geojson //test file of boundaries
        });
      map.addLayer({
        'id': 'bench_points',
        'type': 'symbol',
        'source': 'benches',
        'layout': {
          'visibility': 'visible',
          'icon-image': 'marker',
          'icon-offset': [10, -15]
          },
        'filter': ['==', '$type', 'Point']
      });

      
    //Update the source from the API every 2 seconds.
    const updateSource = setInterval(async () => {
      geojson.features[0].geometry.coordinates[0] = bench1Coords.long;
      geojson.features[0].geometry.coordinates[1] = bench1Coords.lat;
      map.getSource('benches').setData(geojson);
      }, 2000);

    // async function getLocations(updateSource) {
    //   // Make a GET request to the API and return the location of the ISS.
    //   try {
    //     const response = await fetch(
    //       'https://api.wheretheiss.at/v1/satellites/25544',
    //       { method: 'GET' }
    //     );

    //     const { latitude, longitude } = await response.json();
        
    //     // Return the location of the ISS as GeoJSON.
    //     return {
    //       'type': 'FeatureCollection',
    //       'features': [
    //         {
    //         'type': 'Feature',
    //           'geometry': {
    //           'type': 'Point',
    //           'coordinates': [longitude, latitude]
    //           }
    //         }
    //       ]
    //     };
    //   } catch (err) {
    //     // If the updateSource interval is defined, clear the interval to stop updating the source.
    //     if (updateSource) clearInterval(updateSource);
    //     throw new Error(err);
    //     }
    //   }
      
    });

    map.on("click", e => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["bench_points"],
      })
      if (features.length > 0) {
        const feature = features[0]
        // create popup node
        const popupNode = document.createElement("div")
        console.log("clicked_bench: " + feature?.properties?.benchName)
        IDhandler(feature?.properties?.benchName)
        ReactDOM.render(
          <Popup 
          benchName={feature?.properties?.benchName} 
          battery={feature?.properties?.battery}
          inUse={feature?.properties?.inUse}
          />,
          popupNode
        )
        popUpRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map)
      }
    });

    // clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
