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
 * https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/
 * 
 * https://docs.mapbox.com/mapbox-gl-js/example/heatmap-layer/
 * https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/
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
import redMarkerImg from '../../assets/map/red marker 2.png';
import greenMarkerImg from '../../assets/map/green marker 2.png';
import blueMarkerImg from '../../assets/map/blue marker.png';
import heatmap_data from '../../assets/map/fake_data.geojson';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbHlvaWciLCJhIjoiY2t6NXRxN3NpMDJnYjJxbXBzMTRzdDU1MSJ9.NHGShZvAfR27RnylGIP0mA';

/**
 * Popup defines a popup box item which appears when clicking on a bench icon on the map
 *
 */
const Popup = ({ benchName, battery, inUse }) => (
  <div className="popup bench-marker">
    <div className="bench-metric-row">
      <h4 className="row-title">Bench Num:</h4>
      <div className="row-value">{benchName}</div>
    </div>
    <div className="bench-metric-row">
      <h4 className="row-title">Status:</h4>
      <div className="row-value">{inUse ? "Used" : "Free"}</div>
    </div>
    <div className="bench-metric-row">
      <h4 className="row-title">Battery:</h4>
      <div className="row-value">{battery}%</div>
    </div>
  </div>
)

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
const Map = ( { parkBoundaries, benchData, heatmapData, IDhandler, locHandler, center, bounds, updateHandler, getCoords, getHeatMap, live } ) => {
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
  
    // When a marker has been dragged, record its new location for the form
    function onDragEnd() {
      const lngLat = marker.getLngLat();
      locHandler(lngLat)
    }
  
    // define a new marker object used to specify update bench positions
    const marker = new mapboxgl.Marker({
      //element: redMarkerImg,
      draggable: true
      })
      .setLngLat(center)
      .addTo(map);

    marker.on('dragend', onDragEnd);

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


      //Add a data source containing individual markers for each of the benches.
      map.addSource('benches', {
        'type': 'geojson',
        'data': geojson
        });
      map.addLayer({
        'id': 'bench_points',
        'type': 'symbol',
        'source': 'benches',
        'layout': {
          'visibility': 'visible',
          'icon-image': 'red marker',
          'icon-offset': [10, -15]
          },
        'filter': ['==', 'inUse', true]
      });
      map.addLayer({
        'id': 'free_bench_points',
        'type': 'symbol',
        'source': 'benches',
        'layout': {
          'visibility': 'visible',
          'icon-image': 'green marker',
          'icon-offset': [10, -15]
          },
        'filter': ['==', 'inUse', false]
      });      
    });

    map.on('idle',function(){
      map.resize()
      })

    if (live) {
      //Update the bench source from the API every 2 seconds, to get the new gps positions
      const updateSource = setInterval(async () => {
        console.log("updating");
        // Tell the arent to get new data
        updateHandler();
        console.log("getting bench");
        // Get and use the updated bench data
        const benchCoords = getCoords();
        map.getSource('benches').setData(benchCoords);
        console.log("getting hm");
        // get and update the heat map data
        const heatmapData = getHeatMap();
        console.log("retrieved heatmap: " + heatmapData.features);
        map.getSource('heatmap').setData(heatmapData);
        }, 2000);
      }

    // define map behaviour when clicked:
    // - popup appears if a bench marker is clicked on
    // That bench's ID is autofilled in the form using the benchID handler
    map.on("click", e => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["bench_points", "free_bench_points"],
      })
      if (features.length > 0) {
        const feature = features[0]
        // create popup node
        const popupNode = document.createElement("div")
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

    // After the last frame rendered before the map enters an "idle" state.
    map.on('idle', () => {
      const id = 'popularity_heatmap';

      // If these two layers were not added to the map, abort
      if (!map.getLayer(id)) {
        return;
      }
      
      if (document.getElementById(id)) {
        return;
      }
      
      // Create a link.
      const link = document.createElement('a');
      link.id = id;
      link.href = '#';
      link.textContent = 'Location Popularity';
      link.className = '';
      
      // Show or hide layer when the toggle is clicked.
      link.onclick = function (e) {
        const clickedLayer = this.id;
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
      }, [live]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
