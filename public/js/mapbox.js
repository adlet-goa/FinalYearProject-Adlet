 /* es-lint disan=ble */

// //  const locations = JSON.parse(document.getElementById('map').dataset.locations);
  

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRsM3QiLCJhIjoiY2s4azhsMno3MDJ0dTNwcWN3ZmJzN3BzYyJ9.mDpIuexEYZHtXv26wo-izQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/adl3t/ck8k95mti029d1irl36gdrfqb',
    zoom:8.5,
    center: [73.90,15.40]
});

const locations = [
    [73.7943744,15.3989777],
    [73.9313833,15.3269589],
    [73.9877381,15.2835701],
    [74.010573,15.412807],
    [73.9442479,15.2316041],
    [73.9036,15.5417]
];
 console.log(locations);
// // new mapboxgl.Popup().setLngLat(coords).setHTML(`<p>${description}</p>`);



locations.forEach(function(coors){
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
// //     map.fitBounds(bounds);
