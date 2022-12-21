function init(){
  dropDown()
  barChart('ALABAMA')
  lineChart('ALABAMA')
}
init()

function dropDown() {
let data = d3.csv('static/honey_data_clean.csv').then(function(data) {
  let states = data.map(i => i.State);

  let stateNames = [...new Set(states)];

  stateNames.sort(function(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  var optionMenu = d3.select('#selDataset')
  for (let i = 0; i < stateNames.length; i++) {
    option = document.createElement('option');
    option.text = stateNames[i];
    optionMenu.append('option')
    .attr('value', stateNames[i])
    .text(stateNames[i]);
  }})
};

function optionChanged(stateNames){
  barChart(stateNames)
  lineChart(stateNames)
};

function lineChart(stateNames){
  let data = d3.csv('static/honey_data_clean.csv').then(function(data) {

  let resultArray = data.filter(x => x.State == stateNames);
  let productionPrice = resultArray.map(i => parseFloat(i["Price Received, Measured in $/Lb"]));
  let productionYear = resultArray.map(i => parseInt(i.Year));
    console.log(productionPrice);
    console.log(productionYear);

  let trace = [
    {
      y: productionPrice,
      x: productionYear,
      mode: 'lines+markers',
      type: 'scatter',
      }
  ];

  let lineLayout = {
    title: "Selling Price per lb"
  }
        
  Plotly.newPlot('line', trace, lineLayout);
  })
};

function barChart(stateNames){
  let data = d3.csv('static/honey_data_clean.csv').then(function(data) {

  let resultArray = data.filter(x => x.State == stateNames);
  let productionVolume = resultArray.map(i => i["Production, Measured in Lb"]);
  let productionYear = resultArray.map(i => i.Year)
  
  let barData = [
    {
      y: productionVolume,
      x: productionYear,
      type: 'bar',
      }
  ];
  
  let barLayout = {
    title: 'Production by Year (lbs)',
    margin: { t: 30, l: 150 }
    };
        
    Plotly.newPlot('bar', barData, barLayout);
      
    })

  };

  var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5
    });
  
  

    // // Add a tile layer.
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(myMap);
    
    // // State markers
    // var states = [{
    //   location: [32.51, -86.5],
    //   name: "Alabama",
    //   population: "x"
    // },
    // {
    //   location: [64.44, -152.28],
    //   name: "Alaska",
    //   population: "x"
    // },
    // {
    //   location: [34.19, -111.48],
    //   name: "Arizona",
    //   population: "x"
    // },
    // {
    //   location: [34.49, -92.18],
    //   name: "Arkansas",
    //   population: "x"
    // },
    // {
    //   location: [36.6, -120.5],
    //   name: "California",
    //   population: "x"
    // },
    // {
    //   location: [38.6, -105.39],
    //   name: "Colorado",
    //   population: "x"
    // }
    // ];
    
    // // Add code to create a marker for each of the following cities and to add it to the map.
    // for (var i = 0; i < states.length; i++) {
    //   var state = states[i]
    //   L.marker(state.location)
    //   .bindPopup(`<h1>${state.name}</h1> <hr> <h3>Population ${state.population.toLocaleString()}</h3>`)
    //   .addTo(myMap);
    // };