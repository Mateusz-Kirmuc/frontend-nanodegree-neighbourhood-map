const places = [{
    id: 0,
    name: "PKiN",
    location: {
      lat: 52.231831,
      lng: 21.005984
    }
  },
  {
    id: 1,
    name: "Museum of Warsaw Uprising",
    location: {
      lat: 52.232332,
      lng: 20.980885
    }
  },
  {
    id: 2,
    name: "National Museum of Art",
    location: {
      lat: 52.231620,
      lng: 21.024801
    }
  },
  {
    id: 3,
    name: "Royal Castle",
    location: {
      lat: 52.247975,
      lng: 21.015255
    }
  },
  {
    id: 4,
    name: "President Palace",
    location: {
      lat: 52.243146,
      lng: 21.016624
    }
  }
];

let ViewModel = function() {
  let self = this;
  self.displaySidebar = ko.observable(false);
  self.places = ko.observableArray(places);
  self.query = ko.observable("");

  self.resetPlaces = function() {
    self.places(places);
    self.showMarkers();
  };

  self.showMarkers = function() {
    for (let marker of markers) {
      marker.setMap(map);
    }
  }

  self.hideMarkers = function() {
    for (let place of places) {
      if (self.places().indexOf(place) == -1) {
        markers[place.id].setMap(null);
      }
    }
  }

  self.filterPlaces = function() {
    let filteredPlaces = [];
    for (let place of places) {
      let re = new RegExp(self.query(), "i");
      if (place.name.search(re) > -1) {
        filteredPlaces.push(place);
      }
    }
    self.query("");
    self.places(filteredPlaces);
    self.hideMarkers();
  };

  self.handleForm = function() {
    if (!self.query()) {
      self.resetPlaces();
    } else {
      self.filterPlaces();
    }
  };

  self.toggleSidebar = function() {
    self.displaySidebar(self.displaySidebar() ? false : true);
  };

  self.handleClick = function(place) {
    for (let infoWindow of infoWindows) {
      infoWindow.close();
    }
    infoWindows[place.id].open(map, markers[place.id]);
  }
};
ko.applyBindings(new ViewModel());
