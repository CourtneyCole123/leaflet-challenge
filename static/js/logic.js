function CreateMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [streetmap, earthquakes]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
function CreateMarkers(data){

    let datafeatures = data.features
    let earthquakeMarkers = []
    datafeatures.forEach(feature =>{
        let coordinates = feature.geometry.coordinates
        let earthquakeMarker = L.marker([coordinates[0],coordinates[1]])
        .bindPopup("hoobastank")
        earthquakeMarkers.push(earthquakeMarker)
    })

    CreateMap(L.layerGroup(earthquakeMarkers));
}

// Perform an API call to the Earthquake API to get the earthquake information.
const earthquakeApiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(earthquakeApiUrl).then(CreateMarkers)




// Import and visualize the data by doing the following:

// Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

// Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

// Hint: The depth of the earth can be found as the third coordinate for each earthquake.

// Include popups that provide additional information about the earthquake when its associated marker is clicked.

// Create a legend that will provide context for your map data.

// Your visualization should look something like the preceding map.