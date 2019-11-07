var map = L.map("mapid").setView([47, -122.2], 10);
var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiZ2VudGVuIiwiYSI6ImNrMmdzOHFsdTA2Z2UzY252b3B1cjJqdXQifQ.B2doXxjSELmQIf7wIIDBZg"
  }
).addTo(map);


// add GeoJSON layer to the map once the file is loaded
$.getJSON("Pierce_County_Basemap.json", function(data) {
  L.geoJson(data).addTo(map);
});
// add GeoJSON layer to the map once the file is loaded
$.getJSON("Tax_Parcels.json", function(data) {
  L.geoJson(data).addTo(map);
});
// add GeoJSON layer to the map once the file is loaded
$.getJSON("TRI_Clip.json", function(data) {
  L.geoJson(data).addTo(map);
});
  // function addPopup(feature, layer) {
  //   layer.bindPopup(feature.properties.NAME);
  // }
$.getJSON("TRI_Clip_MultipleRings.geojson", function(data) {
  L.geoJson(data).addTo(map);
});
