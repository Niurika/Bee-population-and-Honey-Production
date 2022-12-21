function init(){
  dropDown()
  barChart('ALABAMA')
  lineChart('ALABAMA')
  map()
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

function map(){
  var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5
    });

    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(myMap);

    L.geoJson(statesData).addTo(myMap);

  // function onEachFeature(feature, layer) {
  //   layer.on({
  //     click: layer.bindPopup(`<h1>${statesData.properties.name}</h1>
  //     <hr>
  //     <h3>Colonies: ${statesData.properties.bee_pop}</h3>`)
  //   });
  // }

  var marker = L.marker([51.5, -0.09]).addTo(myMap);
    // Bind a mouseover event to the marker
    marker.on('mouseover', function (e) {
    // Open a popup with information about the marker
    var popup = L.popup()
        .setLatLng(e.properties.geometry.coordinates)
        .setContent(e.properties.name)
        .openOn(myMap);
  });
};
map()