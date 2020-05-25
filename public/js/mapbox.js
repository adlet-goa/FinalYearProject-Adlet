/* eslint-disable */

// //  const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWRsM3QiLCJhIjoiY2s4azhsMno3MDJ0dTNwcWN3ZmJzN3BzYyJ9.mDpIuexEYZHtXv26wo-izQ';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/adl3t/ck8k95mti029d1irl36gdrfqb',
  minZoom: 8.5,
  center: [73.9, 15.4]
});

// //fetch kiosk
// async function getAllKiosk(){
//   const res = await fetch('/api/v1/kiosks');
//   const data = await res.json();
//   console.log(data);
//   const kiosks = data.data.map(kiosk => {
//       return{
//         // feature for Mapbox DC
//         'type': 'Feature',
//         'geometry': {
//         'type': 'Point',
//         'coordinates': [kiosk.location.coordinates[0], kiosk.location.coordinates[1]]
//         },
//         'properties': {
//         'title': kiosk.name,
//         'icon': 'monument'
//         }
//         }
//   });

//   loadMap(kiosks);
// }

// function loadMap(kiosks){
//   map.on('load', function() {
//     map.addSource('points', {
//     'type': 'geojson',
//     'data': {
//     'type': 'FeatureCollection',
//     'features': kiosks
//     }});
// });

// }
const locations = [
  [73.7943744, 15.3989777],
  [73.9313833, 15.3269589],
  [73.9877381, 15.2835701],
  [74.010573, 15.412807],
  [73.9442479, 15.2316041],
  [73.9036, 15.5417]
];
//console.log(locations);
// // new mapboxgl.Popup().setLngLat(coords).setHTML(`<p>${description}</p>`);

locations.forEach(function(coors) {
  new mapboxgl.Marker().setLngLat(coors).addTo(map);
});

// // const bounds = new mapboxgl.LngLatBounds();

// // const el = document.createElement('div');
// // el.className = 'marker';

// //     new mapboxgl.Marker({
// //         element: el,
// //         anchor: 'bottom'
// //     }).setLngLat(loc.coordinates).addTo(map);

// //     bounds.extend(loc.coordinates);
// //     map.fitBounds(bounds)
//loadMap();
