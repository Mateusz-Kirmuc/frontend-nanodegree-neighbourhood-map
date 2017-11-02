let map;
let markers = [];

function initMap() {
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
      map: map
    });
    markers.push(marker);
  }
}
