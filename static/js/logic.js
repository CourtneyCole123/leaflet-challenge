function CreateMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap,
      "Topographic Map": topo
    };
  
    // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [37.65, -97.57],
      zoom: 5,
      layers: [streetmap, topo, earthquakes]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }

// Create a legend to display information about our map.
let legend = L.control({position:'bottomright'});

// When the layer control is added, insert a div with the class of "legend".
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map.
legend.addTo(map);


function CreateMarkers(data){

  // Get the features data
  let datafeatures = data.features

  // Create an array to hold the markers
  let earthquakeMarkers = []

  // Loop through each fature to key feature details
  datafeatures.forEach(feature =>{
    let coordinates = feature.geometry.coordinates
    let magnitude = feature.properties.mag
    let depth = coordinates[2]
    let radius = magnitude * 10000
    let fillcolor = SelectedColor(depth)

  // While still looping, create a circle marker for magnitude of the earthquake and bind a popup

    let earthquakeMarker = L.circle([coordinates[1],coordinates[0]],
      {radius:radius, color: fillcolor, opacity:1, fillOpacity:.8})
    .bindPopup(`<h3>${feature.properties.place.toUpperCase()}</h3>
      <hr><p>Time Occured: ${new Date(feature.properties.time)}</p>   
      <p>Magnitude: ${magnitude}</p>
      <p>Location: ${coordinates[1]}, ${coordinates[0]}</p>
      <p>Depth: ${coordinates[2]}</p>`)

  // While still looping, push the earthquake markers to the marker array   
      earthquakeMarkers.push(earthquakeMarker)
      
  // Create a function for the fill color based on depth
    function SelectedColor(depth){
      if (depth > 20) {
        return "black";
      } else if (depth >=20) {
        return "purple";
      } else if (depth >=10) {
        return "red";
      } else if (depth >=5) {
      return "orange";
      } else {
      return "yellow";
      }
    }
        
})
    // https://stackoverflow.com/questions/6695600/convert-datetime-to-valid-javascript-date

// Add marker layer to the map
CreateMap(L.layerGroup(earthquakeMarkers))

}

// Perform an API call to the Earthquake API to get the earthquake information.
const earthquakeApiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(earthquakeApiUrl).then(CreateMarkers)