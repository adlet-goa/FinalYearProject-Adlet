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
    // Add popup
    const popup = new mapboxgl.Popup({
      offset: 30
    }).setHTML(`<p>location: ${loc.address} <br/> ${loc.description}</p>`);

    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .setPopup(popup)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100
    }
  });
};
