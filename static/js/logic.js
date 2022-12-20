//load data 
data = d3.csv('path')
console.log(data)















// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // State markers
  var states = [{
    location: [32.51, -86.5],
    name: "Alabama",
    population: "x"
  },
  {
    location: [64.44, -152.28],
    name: "Alaska",
    population: "x"
  },
  {
    location: [34.19, -111.48],
    name: "Arizona",
    population: "x"
  },
  {
    location: [34.49, -92.18],
    name: "Arkansas",
    population: "x"
  },
  {
    location: [36.6, -120.5],
    name: "California",
    population: "x"
  },
  {
    location: [38.6, -105.39],
    name: "Colorado",
    population: "x"
  }
  ];
  
  // Add code to create a marker for each of the following cities and to add it to the map.
  for (var i = 0; i < states.length; i++) {
    var state = states[i]
    L.marker(state.location)
    .bindPopup(`<h1>${state.name}</h1> <hr> <h3>Population ${state.population.toLocaleString()}</h3>`)
    .addTo(myMap);
  };


//load data 
  data = d3.csv('path')
  console.log(data)