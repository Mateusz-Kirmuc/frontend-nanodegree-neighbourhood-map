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
  this.displaySidebar = ko.observable(false);
  this.places = ko.observableArray(places);
  this.query = ko.observable("");

  this.resetPlaces = function() {
    this.places(places);

  };

  this.filterPlaces = function() {
    let filteredPlaces = [];
    for (let place of places) {
      let re = new RegExp(this.query(), "i");
      if (place.name.search(re) > -1) {
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

  this.toggleSidebar = function() {
    this.displaySidebar(this.displaySidebar() ? false : true);
  }
}
ko.applyBindings(new ViewModel());
