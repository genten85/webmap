var Esri = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png?access_token={accessToken}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoiZ2VudGVuIiwiYSI6ImNrMmdzOHFsdTA2Z2UzY252b3B1cjJqdXQifQ.B2doXxjSELmQIf7wIIDBZg"
    }
  ),
  Wikimedia = L.tileLayer(
    "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
      minZoom: 1,
      maxZoom: 19
    }
  );

Darkness = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19
  }
);

var map = L.map("mapid", {
  center: [47, -122.2],
  zoom: 10,
  layers: [Esri, Wikimedia, Darkness]
});

var baseMaps = {
  "Esri WorldImagery": Esri,
  Wikimedia: Wikimedia,
  Darkness: Darkness
};

map.addControl(new L.Control.Fullscreen());
L.control.layers(baseMaps).addTo(map);
var controlLayers = L.control.layers().addTo(map);

var geojsonMarkerOptions = {
  fillOpacity: 1,
  fillColor: "red",
  color: "red",
  radius: 4
};

// Loading a GeoJSON file (using jQuery's $.getJSON)
$.getJSON("Boundary_Lines.geojson", function(geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function(feature) {
      return {
        fillColor: "gray",
        fillOpacity: 0.5
      };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>" + "Pierce County, WA" + "</strong><br/>");
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, "Pierce County");
});
// Loading a GeoJSON file (using jQuery's $.getJSON)
$.getJSON("Out_TRI.json", function(geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function(feature) {
      return {
        color: "turquoise",
        fillOpacity: 0.5
      };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "<strong>" +
          "NAME: " +
          "</strong>" +
          feature.properties.Business_N +
          "<strong><br/>" +
          "PROPERTY TYPE: " +
          "</strong>" +
          feature.properties.Landuse_De
      );
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, "Parcels outside of buffers");
});
// Loading a GeoJSON file (using jQuery's $.getJSON)
$.getJSON("TRI_Clip_MultipleRings.json", function(geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function(feature) {
      return {
        color: "orange",
        fillOpacity: 0.5
      };
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, "Toxic buffers");
});
// Loading a GeoJSON file (using jQuery's $.getJSON)
$.getJSON("In_TRI.json", function(geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    style: function(feature) {
      return {
        color: "black",
        fillOpacity: 0.5
      };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "<strong>" +
          "NAME: " +
          "</strong>" +
          feature.properties.Business_N +
          "<strong><br/>" +
          "PROPERTY TYPE: " +
          "</strong>" +
          feature.properties.Landuse_De
      );
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, "Parcels inside of buffers");
});
// Loading a GeoJSON file (using jQuery's $.getJSON)
$.getJSON("TRI_Clip.json", function(geojson) {
  var geojsonLayer = L.geoJson(geojson, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "<strong>" +
          "I am a toxic release site. Stay away from me!" +
          "</strong><br/>"
      );
    }
  }).addTo(map);
  controlLayers.addOverlay(geojsonLayer, "Toxic release sites");
});
