let places = [{
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
}
ko.applyBindings(new ViewModel());
