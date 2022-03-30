import { loadScript, loadModules } from '../node_modules/esri-loader/dist/esm/esri-loader.js';

// preload the ArcGIS API
// NOTE: in this case, we're not passing any options to loadScript()
// so it will default to loading the latest 4.x version of the API from the CDN
loadScript();

// later, for example after transitioning to a route with a map
// you can now load the map modules and create the map
const [Config, Map, MapView, Search, locator, BasemapToggle, BasemapGallery] = await loadModules(
    ['esri/config', 
    'esri/Map',
    'esri/views/MapView',           
    "esri/widgets/Search", 
    "esri/rest/locator", 
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery"]);

Config.apiKey = "AAPK3c95b5659caa488e9da50039b7a2fdf0M9i0Ye3Vp7kl1qC69N5Ia2JaEdZ7RxQxK4eM-nAxFet65zQM1OT2Y891Nw9st4RE";

const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
    ground: "world-elevation" //Elevation service
  });

  const view = new MapView({
    map: map,
    center: [-118.805, 34.027], // Longitude, latitude
    zoom: 13, // Zoom level
    container: "geo" // Div element
});

const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "arcgis-imagery"
 });

 view.ui.add(basemapToggle,"bottom-right");

 const basemapGallery = new BasemapGallery({
  view: view,
  source: {
    query: {
      title: '"World Basemaps for Developers" AND owner:esri'
    }
  }
});

view.ui.add(basemapGallery, "top-right"); // Add to the view

  // Create search widget
  const search = new Search({  
      view: view
  });

  // Add search to the map
  view.ui.add(search, "top-right"); 

  const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  view.on("click", function(evt){
    const params = {
      location: evt.mapPoint
    };

    locator.locationToAddress(serviceUrl, params)
      .then(function(response) { // Show the address found
        const address = response.address;
        showAddress(address, evt.mapPoint);
      }, function(err) { // Show no address found
        showAddress("No address found.", evt.mapPoint);
      });
  });

  function showAddress(address, pt) {
    view.popup.open({
      title:  + Math.round(pt.longitude * 100000)/100000 + ", " + Math.round(pt.latitude * 100000)/100000,
      content: address,
      location: pt
    });
  }

