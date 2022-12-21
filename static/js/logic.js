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

  let trace = [
    {
      y: productionPrice,
      x: productionYear,
      mode: 'lines+markers',
      type: 'scatter',
      }
  ];

  let lineLayout = {
    title: 'Selling Price by Year ($/lb)'
  };
        
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
  // var myMap = L.map("map", {
  //     center: [37.09, -95.71],
  //     zoom: 5
  //   });

  //   var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       maxZoom: 19,
  //       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   }).addTo(myMap);

  //   L.geoJson(statesData).addTo(myMap);

  // // function onEachFeature(feature, layer) {
  // //   layer.on({
  // //     click: layer.bindPopup(`<h1>${statesData.properties.name}</h1>
  // //     <hr>
  // //     <h3>Colonies: ${statesData.properties.bee_pop}</h3>`)
  // //   });
  // // }

  // var marker = L.marker([51.5, -0.09]).addTo(myMap);
  //   // Bind a mouseover event to the marker
  //   marker.on('mouseover', function (e) {
  //   // Open a popup with information about the marker
  //   var popup = L.popup()
  //       .setLatLng(e.properties.geometry.coordinates)
  //       .setContent(e.properties.name)
  //       .openOn(myMap);
  // });

//////////////////////////////////////////
const map = L.map('map').setView([37.8, -96], 4);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	// control that shows state info on hover
	const info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		const contents = props ? `<b>${props.name}</b><br />${props.density} colonies` : 'Hover over a state';
		this._div.innerHTML = `<h3>Num. of Honey Bee Colonies (2021)</h2>${contents}`;
	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 550000 ? '#800026' :
			d > 450000  ? '#BD0026' :
			d > 250000  ? '#E31A1C' :
			d > 100000  ? '#FC4E2A' :
			d > 50000   ? '#FD8D3C' :
			d > 1000   ? '#FEB24C' :
			d > 10   ? '#FED976' : '#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.density)
		};
	}

	function highlightFeature(e) {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		layer.bringToFront();

		info.update(layer.feature.properties);
	}

	/* global statesData */
	const geojson = L.geoJson(statesData, {
		style,
		onEachFeature
	}).addTo(map);

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


	const legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info legend');
		const grades = [0, 10, 1000, 50000, 100000, 250000, 450000, 550000];
		const labels = [];
		let from, to;


    for (var i = 0; i < grades.length; i++) {
      labels.push('<i style="background-color:' + getColor(grades[i] + 1.0) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></i>');
    }
		// for (let i = 0; i < grades.length; i++) {
		// 	from = grades[i];
		// 	to = grades[i + 1];

		// 	labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
		// }


		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);




















};
map()