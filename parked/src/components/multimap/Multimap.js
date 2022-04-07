/**
 * Defining a map functional component to use in our website
 * Currently a temporary "dummy" map which centres on george square
 * 
 */

 import React, { useRef, useEffect } from 'react';
 import mapboxgl from 'mapbox-gl';
 import ReactDOM from 'react-dom';
 import './map.scss';
 import redMarkerImg from '../../assets/map/red marker 2.png';
 import greenMarkerImg from '../../assets/map/green marker 2.png';
 import blueMarkerImg from '../../assets/map/blue marker.png';
 
 mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbHlvaWciLCJhIjoiY2t6NXRxN3NpMDJnYjJxbXBzMTRzdDU1MSJ9.NHGShZvAfR27RnylGIP0mA';
 
 
 /**
  * 
  * @param {*} param0 
  * park boundaries is the geojson object defining the outline of the park and any obstacles in it
  * data id the geojson object containing all of the bench points and their properties
  * TODO: heatmap
  * IDhandler is the function which allows updating of the form to reflect the ID of the clicked bench
  * locHandler allows updating of the form to show the location of the dragged-and-dropped marker
  * center is the center point of the map
  * TODO: bounds
  * updateHandler is the function which tells the parent to update its geojson data from ros
  * getCoords returns the updated bench data geojson object from the parent
  * getHeatMap returns the updated heatmap data from the parent
  * live specifies if the map should update its data or remain static
  * @returns 
  */
 const Map = ( { parkBoundaries, benchData, heatmap_data, locHandler, center, bounds, live, reset, handleReset } ) => {
   const mapContainerRef = useRef(null);
   const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
 
   const geojson = benchData; //TODO: could this use the getter function instead? to reduce params
   //const heatmap_data = heatmapData;
 
   // initialize new map when component mounts
   useEffect(() => {
     const map = new mapboxgl.Map({
       container: mapContainerRef.current,
       style: 'mapbox://styles/mapbox/streets-v11',
       //west-end of the meadows
       center: center,
       zoom: 8.3,
       interactive: true
     });
 
     map.fitBounds(bounds);

     for (const f in benchData.features) {
        // When a marker has been dragged, record its new location for the form
        function onDragEnd() {
            const lngLat = markerA.getLngLat();
            locHandler(benchData.features[f].properties.benchName, lngLat);
        }

        const markerB = new mapboxgl.Marker({
            draggable: false,
            color: 'orange',
            })
            .setLngLat([benchData.features[f].geometry.coordinates[0], benchData.features[f].geometry.coordinates[1]])
            .addTo(map);
        
        // define a new marker object used to specify update bench positions
        const markerA = new mapboxgl.Marker({
            draggable: true,
            color: 'red',
            })
            .setLngLat([benchData.features[f].geometry.coordinates[0], benchData.features[f].geometry.coordinates[1]])
            .addTo(map);
    
        markerA.on('dragend', onDragEnd);
     }
   
     
 
     // add navigation control (the +/- zoom buttons)
     map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
     
     // Add features and layers to the map when it loads
     map.on('load', () => {
       map.resize();
 
       map.loadImage(
         redMarkerImg,
         (error, image) => {
           if (error) throw error;
 
           // Add the image to the map style.
           map.addImage('red marker', image);
         }); 
         
       map.loadImage(
         greenMarkerImg,
         (error, image) => {
           if (error) throw error;
 
           // Add the image to the map style.
           map.addImage('green marker', image);
         });
 
         map.loadImage(
           blueMarkerImg,
           (error, image) => {
             if (error) throw error;
   
             // Add the image to the map style.
             map.addImage('blue marker', image);
           });
 
       // Add a source with the park boundaries (includes a shaded area and solid outline)
       map.addSource('park', {
         'type': 'geojson',
         'data': parkBoundaries //test file of boundaries
         });
       map.addLayer({
         'id': 'park-boundary-fill',
         'type': 'fill',
         'source': 'park',
         'layout': {},
         'paint': {
           'fill-color': 'green',
           'fill-opacity': 0.5,
           }
       });
       map.addLayer({
         'id': 'park-boundary-outline',
         'type': 'line',
         'source': 'park',
         'layout': {},
         'paint': {
           "line-color": '#000',
           }
       });

      //  console.log("heatmap data: " + heatmap_data);
       // Add a heatmap layer to the map showing spots where benches get used
       map.addSource('heatmap', {
         'type': 'geojson',
         'data': heatmap_data
         });
       map.addLayer({
         'id': 'popularity_heatmap',
         'type': 'heatmap',
         'source': 'heatmap',
         'layout': {
           'visibility': 'none',
         },
         'paint': {
           // Increase the heatmap weight based on frequency and property magnitude
           //'heatmap-weight': ['interpolate',['linear'],['get', 'mag'],0,0,6,1],
           'heatmap-radius': 45,
           // Increase the heatmap color weight weight by zoom level
           // heatmap-intensity is a multiplier on top of heatmap-weight
           'heatmap-intensity': ['interpolate',['linear'],['zoom'],0,1,9,3],
           'heatmap-weight': 0.3,
           // Transition from heatmap to circle layer by zoom level
           'heatmap-opacity': 0.7
         }
       },
       'waterway-label'
       );
 
     });
 
    // After the last frame rendered before the map enters an "idle" state.
    map.on('load', () => {
        const id = 'popularity_heatmap';
        const l_name = 'popularity_heatmap';
  
        // If these two layers were not added to the map, abort
        if (!map.getLayer(id)) {
          return;
        }
        
        if (document.getElementById(id)) {
          // get elements
          var child = document.getElementById(id);
          var parent = document.getElementById("menu");
  
          // Delete child
          parent.removeChild(child);
        }
        
        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = 'Location Popularity';
        link.className = '';
        
        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
          const clickedLayer = l_name;
          e.preventDefault();
          e.stopPropagation();
          
          const visibility = map.getLayoutProperty(
          clickedLayer,
          'visibility'
          );
          
          // Toggle layer visibility by changing the layout object's visibility property.
          if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
          } else {
            this.className = 'active';
            map.setLayoutProperty(
              clickedLayer,
              'visibility',
              'visible'
            );
          }
        };
        
        const layers = document.getElementById('menu');
        layers.appendChild(link);
        
        });

    // clean up on unmount
    return () => map.remove();
  }, [live, reset]);


 
   return <div className="map-container" ref={mapContainerRef} />;
 };
 
 export default Map;
 