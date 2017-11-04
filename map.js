let map;
let markers = [];
let infoWindows = [];

function initMap() {
  let bounds = new google.maps.LatLngBounds();
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 52.238297,
      lng: 21.006561
    },
    zoom: 13
  });
  for (let place of places) {
    let marker = new google.maps.Marker({
      position: place.location,
      map: map,
      animation: null
    });
    markers.push(marker);

    let infoWindow = new google.maps.InfoWindow({
      content: 'Here will be wiki content'
    });

    infoWindows.push(infoWindow);
    marker.addListener("click", function() {
      infoWindow.open(map, marker);
      toggleBounce(marker);
    });

    bounds.extend(marker.position);
  }
  map.fitBounds(bounds);
}

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
