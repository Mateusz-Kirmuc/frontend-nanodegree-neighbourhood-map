let map;
// create containers for new markers and info windows objets
let markers = [];
let infoWindows = [];

function initMap() {
  let bounds = new google.maps.LatLngBounds();
  // Constructor creates a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 52.238297,
      lng: 21.006561
    },
    zoom: 13
  });

  // for every place create new marker and info window
  for (let place of places) {
    // create new marker using place position
    let marker = new google.maps.Marker({
      position: place.location,
      map: map,
      animation: null
    });
    // add marker to markers array
    markers.push(marker);

    // create new info window
    let infoWindow = new google.maps.InfoWindow({});

    // add window to infoWindows array
    infoWindows.push(infoWindow);

    // add content to info window using place wikipedia query and wikipedia API
    // NOTE: content text is in Polish
    setContentToInfoWindow(infoWindow, place.wiki_query);

    // add click handler to marker
    marker.addListener("click", function() {
      // clear map from all windows and animations
      stopAnimateAllMarkers();
      closeAllWindows();

      // set only one animation of clicked marker
      marker.setAnimation(google.maps.Animation.BOUNCE);
      // open info window related to marker
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

// function resposible for ajax request to wikipedia api
function setContentToInfoWindow(infoWindow, query) {
  $.ajax({
    type: "GET",
    url: `http://pl.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${query}&callback=?`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      // NOTE: wikipedia pictures errors shown in console are irrelevant to UI
      // becouse I'm using only text from page first paragraph
      infoWindow.setContent($(data.parse.text["*"]).children("p")[0].innerText);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    }
  });
}
