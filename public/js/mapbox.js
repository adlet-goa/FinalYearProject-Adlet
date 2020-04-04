/* es-lint disan=ble */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRsM3QiLCJhIjoiY2s4azkxZWc0MDJ4ZzNtb296b2E0NTU5dyJ9.FFp_9bKfdg8E789meckhAQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/adl3t/ck8k95mti029d1irl36gdrfqb'
});

const bounds = new mapboxgl.LngLatBounds();


    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    }).setLngLat(locations.coordinates).addTo(map);

    bounds.extend(locations.coordinates)


map.fitBounds(bounds);
