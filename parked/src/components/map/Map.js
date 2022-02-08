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

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    map.on('load', () => {

      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage('cat', image);
        });

// Add a data source containing bench's initial location.
      map.addSource('point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-3.1967103481292725, 55.94144352828404]
              }
            }
          ]
        }
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

      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point', // reference the data source
        'layout': {
          'icon-image': 'cat', // reference the image
          'icon-size': 0.25
        }
      });
    });
      

    // clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
