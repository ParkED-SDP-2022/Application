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
 * Currently a temporary "dummy" map which centres on george square
 * 
 * TODO: load in and render geojson data
 * TODO: stop from zooming? or havea  reset view button?
 * TODO: dynamically zoom to data?
 */

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
import './map.scss';
import marker from '../../assets/map/marker2.png';

import '../../App.css';

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


const Map = ( { parkBoundaries, benches } ) => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      //west-end of the meadows
      center: [-3.197310, 55.941542],
      zoom: 16,
      interactive: true
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    map.on('load', () => {
      map.resize();

      map.loadImage(
        marker,
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage('marker', image);
        });

      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage('cat', image);
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
          'line-color': 'blue',
          'line-width': 5
          },
        'filter': ['==', '$type', 'LineString']
      });


      // Add a data source containing benches.
      map.addSource('benches', {
        'type': 'geojson',
        'data': benches //test file of boundaries
        });
      map.addLayer({
        'id': 'bench_points',
        'type': 'symbol',
        'source': 'benches',
        'layout': {
          'visibility': 'visible',
          'icon-image': 'marker',
          'icon-offset': [10, -10]
          },
        'filter': ['==', '$type', 'Point']
      });

      
    });

    map.on("click", e => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["bench_points"],
      })
      if (features.length > 0) {
        const feature = features[0]
        // create popup node
        const popupNode = document.createElement("div")
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
    })

      

    // clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
