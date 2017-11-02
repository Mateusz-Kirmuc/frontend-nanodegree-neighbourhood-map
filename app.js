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
  this.displaySidebar = ko.observable(false);
  this.places = ko.observableArray(places);
  this.query = ko.observable("");

  this.resetPlaces = function() {
    this.places(places);
    for (let marker of markers) {
      marker.setMap(map);
    }
  };

  this.filterPlaces = function() {
    let filteredPlaces = [];
    for (let place of places) {
      let re = new RegExp(this.query(), "i");
      if (place.name.search(re) > -1) {
        filteredPlaces.push(place);
      }
    }
    this.query("");
    this.places(filteredPlaces);

    for (let place of places) {
      if (this.places().indexOf(place) == -1) {
        markers[place.id].setMap(null);
      }
    }
  };

  this.handleForm = function() {
    if (!this.query()) {
      this.resetPlaces();
    } else {
      this.filterPlaces();
    }
  };

  this.toggleSidebar = function() {
    this.displaySidebar(this.displaySidebar() ? false : true);
  };
};
ko.applyBindings(new ViewModel());
