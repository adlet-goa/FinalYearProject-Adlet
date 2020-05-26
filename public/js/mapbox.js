/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWRsM3QiLCJhIjoiY2s4azhsMno3MDJ0dTNwcWN3ZmJzN3BzYyJ9.mDpIuexEYZHtXv26wo-izQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/adl3t/ck8k95mti029d1irl36gdrfqb'
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>location: ${loc.address} <br/> ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds);
};
