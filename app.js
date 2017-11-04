// below array contains all Model data (data about places)
const places = [{
    id: 0,
    name: "PKiN",
    location: {
      lat: 52.231831,
      lng: 21.005984
    },
    wiki_query: "Pałac_Kultury_i_Nauki"
  },
  {
    id: 1,
    name: "Museum of Warsaw Uprising",
    location: {
      lat: 52.232332,
      lng: 20.980885
    },
    wiki_query: "Muzeum_Powstania_Warszawskiego"
  },
  {
    id: 2,
    name: "National Museum of Art",
    location: {
      lat: 52.231620,
      lng: 21.024801
    },
    wiki_query: "Muzeum_Narodowe_w_Warszawie"
  },
  {
    id: 3,
    name: "Royal Castle",
    location: {
      lat: 52.247975,
      lng: 21.015255
    },
    wiki_query: "Zamek_Królewski_w_Warszawie"
  },
  {
    id: 4,
    name: "President Palace",
    location: {
      lat: 52.243146,
      lng: 21.016624
    },
    wiki_query: "Pałac_Prezydencki_w_Warszawie"
  }
];

let ViewModel = function() {
  let self = this;
  // switch to show/hide side bar
  self.displaySidebar = ko.observable(false);
  self.places = ko.observableArray(places);
  // content of filter input used to filter places (empty by default)
  self.query = ko.observable("");

  // function used to display/hide side bar
  self.toggleSidebar = function() {
    self.displaySidebar(self.displaySidebar() ? false : true);
  };

  // function called after form submit
  self.handleForm = function() {
    // if input content is empty call self.resetPlaces
    if (!self.query()) {
      self.resetPlaces();
      // if input contains some query, then call this.filterPlaces
    } else {
      self.filterPlaces();
    }
  };

  // function shows all initial markers on map
  // (reset places observable and shows all markers)
  self.resetPlaces = function() {
    self.places(places);
    self.showAllMarkers();
  };

  self.showAllMarkers = function() {
    for (let marker of markers) {
      marker.setMap(map);
    }
  }

  // function filters markers on map and update state of self.places observable
  // accordinf to filter input query
  self.filterPlaces = function() {
    // create new local array
    let filteredPlaces = [];
    // populate array with filtered places
    for (let place of places) {
      let re = new RegExp(self.query(), "i");
      if (place.name.search(re) > -1) {
        filteredPlaces.push(place);
      }
    }
    // reset query
    self.query("");
    // update state of self.places
    self.places(filteredPlaces);
    // hide unrequest markers
    self.hideMarkers();
  };

  // function hides unrequest markers
  self.hideMarkers = function() {
    for (let place of places) {
      if (self.places().indexOf(place) == -1) {
        markers[place.id].setMap(null);
      }
    }
  }

  // click handler of every place in sidebar list
  self.handleClick = function(place) {
    let relatedMarker = markers[place.id];
    google.maps.event.trigger(relatedMarker, 'click');
  }
};

ko.applyBindings(new ViewModel());
