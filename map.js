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

    setContentToInfoWindow(infoWindow, place.wiki_query);

    infoWindows.push(infoWindow);
    marker.addListener("click", function() {
      stopAnimateAllMarkers();
      closeAllWindows();
      marker.setAnimation(google.maps.Animation.BOUNCE);
      infoWindow.open(map, marker);
    });

    bounds.extend(marker.position);
  }
  map.fitBounds(bounds);
}

function stopAnimateAllMarkers() {
  for (let marker of markers) {
    marker.setAnimation(null);
  }
}

function closeAllWindows() {
  for (let infoWindow of infoWindows) {
    infoWindow.close();
  }
}

function setContentToInfoWindow(infoWindow, query) {
  $.ajax({
    type: "GET",
    url: `http://pl.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${query}&callback=?`,
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      infoWindow.setContent($(data.parse.text["*"]).children("p")[0].innerText);
    },
    error: function(errorMessage) {
      alert(errorMessage);
    }
  });
}
