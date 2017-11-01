const places = [{
    name: "PKiN"
  },
  {
    name: "Museum of Warsaw Uprising"
  },
  {
    name: "National Museum of Art"
  },
  {
    name: "Royal Palace"
  },
  {
    name: "Belvedere"
  }
];

let ViewModel = function() {
  this.places = ko.observableArray(places);
  this.query = ko.observable("");

  this.resetPlaces = function() {
    this.places(places);

  };

  this.filterPlaces = function() {
    let filteredPlaces = [];
    for (let place of places) {
      if (place.name.search(this.query()) > -1) {
        filteredPlaces.push(place);
      }
    }
    this.places(filteredPlaces);
    this.query("");
  };
  this.handleForm = function() {
    if (!this.query()) {
      this.resetPlaces();
    } else {
      this.filterPlaces();
    }
  };
}
ko.applyBindings(new ViewModel());
