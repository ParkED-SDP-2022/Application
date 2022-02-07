/**
 * Defining a map functional component to use in our website
 * Sources: 
 * https://dev.to/laney/react-mapbox-beginner-tutorial-2e35
 * https://docs.mapbox.com/mapbox-gl-js/example/multiple-geometries/
 * https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/
 * 
 * Currently a temporary "dummy" map which centres on george square
 * 
 * TODO: load in and render geojson data
 * TODO: stop from zooming? or havea  reset view button?
 * TODO: dynamically zoom to data?
 */

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.scss';

import '../../App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbHlvaWciLCJhIjoiY2t6NXRxN3NpMDJnYjJxbXBzMTRzdDU1MSJ9.NHGShZvAfR27RnylGIP0mA';

const Map = ( { parkBoundaries } ) => {
  const mapContainerRef = useRef(null);

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      //west-end of the meadows
      center: [-3.197310, 55.941542],
      zoom: 15,
      interactive: true
    });

    map.on('load', () => {
      map.addSource('park', {
        'type': 'geojson',
        'data': parkBoundaries //test file of boundaries
        });

      // Add a map layer for each type of geometry
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
    });
      

    // clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
