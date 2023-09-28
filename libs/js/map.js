  
//Map initialisating

const locIcon = L.divIcon({
    html: '<i class="fa fa-search fa-2x" aria-hidden="true"></i>',
    iconSize: [20, 20],
    className: 'myDivIcon'
  });
  
var map = L.map('map').setView([$('#inpLat').val(), $('#inpLng').val()], 10);
map.options.minZoom = 1;
map.options.maxZoom = 14;

var southWest = L.latLng(51.20263434385417, -10.79384991201536),
northEast = L.latLng(52.33455164787253, -8.794338363234628);
var bounds = L.latLngBounds(southWest, northEast);
map.setZoom(9);
map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

async function mapEffect({ leafletelement:map} = {}) {
    if (!map ) return;

    let response;

    try {
        response = await axios.get('https://corona.lmao.ninja/v2/countries');
    } catch(e) {
        console.log('E', e);
        return;
    }
    console.log('response', response);
}


// add osiris
        // Configuration values:
    var api_key= "valenciaconference"  // The identifier used to create the map in OSIRS
    var authorization= "ZGVmYXVsdHVzZXI6bXlwYXNzd29yZA=="  // The base64 enconding of "defaultuser:mypassword"
    var place = [39.496043264768105, -0.40192766277868941]  // The center of the map. Usually a point within your building. 
        
        //Globals        
    var levels = [] // Array of LayerGroups, one layer group for each building level
        
        // Leaflet map creation
        //var mymap = L.map('map').setView(place, 17);  
        
    var osiris = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 22,
	    maxNativeZoom: 18,
	    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
        
        // First we need to create the levels
//        queryMap(api_key,authorization,"MAP","{properties.indoor:'level' }",createLevels);
        
        // Now it's time to query all the rooms, corridors, elevators...
//        queryMap(api_key, authorization,"MAP","{ $and: [ {properties.indoor:{$exists: true}} , {properties.indoor: {$ne: 'level'}}] }",drawIndoor);
        
        // Let's add the POIs
//        queryMap(api_key, authorization,"FEATURES","{}",drawPOIs);




//for selection of layers, goto https://leaflet-extras.github.io/leaflet-providers/preview/
//Street map layers
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var OPNVKarte = L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// or https://gis.stackexchange.com/questions/225098/using-google-maps-static-tiles-with-leaflet
// for google map layers

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//Hybrid,
var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//satellite,
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//Terrain
var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

googleStreets.addTo(map); 
//borderdata.addTo(map)

//Add a marker
//L.marker([51.743798443277846, -9.913991467392336]).addTo(map)
var myIcon = L.icon({
    iconUrl: 'libs/images/favicon.png',
    iconSize: [25, 25],
  //    iconAnchor: [22, 94],
  //    popupAnchor: [-3, -76],
  //    shadowUrl: 'my-icon-shadow.png',
  //    shadowSize: [68, 95],
  //    shadowAnchor: [22, 94]
  });


  
var homeMarker = L.marker([51.743798443277846, -9.913991467392336], {icon: myIcon}).addTo(map)
var markerPopup = homeMarker.bindPopup('Home, Cleandra bay ' + homeMarker.getLatLng()).openPopup()
markerPopup.addTo(map)

map.on('popupopen', function(e) {
    var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center
});
 
//console.log(homeMarker.toGeoJSON())

//layer controller
var placeRestau = L.featureGroup();  //To be Matched
var placeLocal = L.featureGroup();    //Already matched - Active Match
var placePass = L.featureGroup(); //To be RE-Matched
var PLaceToVisit = L.featureGroup();   //Awaiting final stage
var Accom = L.featureGroup();   //Awaiting final stage

var baseLayer = {
    "osm": osm,
    "googleStreets": googleStreets
};

var myMapLayers1 = {

};

var myMapLayers = {
    "osiris": osiris,
    "Open Street Map": osm,
    "OPNVKarte": OPNVKarte,
    "Open Topographical": OpenTopoMap,
    "Google streets": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satellite": googleSat,
    "Google Terrain": googleTerrain
};

var overlay1 = {
    "CBL": homeMarker,
    "<img src='libs/icons/pin-restau.png' style='width:40px;height:60px;'>": placeRestau,
    "<img src='libs/icons/pin-local.png' style='width:40px;height:60px;'>": placeLocal,
    "<img src='libs/icons/pin-tovisit.png' style='width:40px;height:60px;'>": PLaceToVisit,
    "<img src='libs/icons/pin-passes.png' style='width:40px;height:60px;'>": placePass,   
    "<img src='libs/icons/pin-accom.png' style='width:40px;height:60px;'>": Accom,
};

var overlay = {

};

//L.control.layers(overlay, {collapsed : true}).addTo(map);

map.locate({setView: true, maxZoom: 10});

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);



L.control.layers(myMapLayers, overlay, {collapsed : true}).addTo(map);
L.control.layers(myMapLayers1, overlay1, {collapsed : false}).addTo(map);

// function setSelectZoom(zLat, zLng) {
//     map.setView([zLat, zLng], zoom);
// }


  //add marker to map               

var mylegend = L.control({ position: "bottomleft" });



// mylegend.onAdd = function(map) {
//   var div = L.DomUtil.create("div", "legend");
//   div.style.backgroundColor = "white";
//   div.style.border = "1px solid black";
//   div.style.borderRadius = "5px";
//   div.innerHTML += '<i style="background: #477AC2"></i><span><img src=\'libs/icons/pin-local.png\' width=\'25px\' > Local Interests </span><br>';
//   div.innerHTML += '<i style="background: #448D40"></i><span><img src=\'libs/icons/pin-restau.png\' width=\'25px\' > Restaurants </span><br>';
//   div.innerHTML += '<i style="background: #E6E696"></i><span><img src=\'libs/icons/pin-passes.png\' width=\'25px\' > Mountain Passes</span><br>';
//   div.innerHTML += '<i style="background: #E6E696"></i><span><img src=\'libs/icons/pin-tovisit.png\' width=\'25px\' > Places to visit</span><br>';


//   return div;
// };

// mylegend.addTo(map);

ToVisitIcon = L.icon({
    iconUrl: 'libs/icons/pin-tovisit.png',
    iconSize: [25, 30],

});                     

PassesIcon = L.icon({
    iconUrl: 'libs/icons/pin-passes.png',
    iconSize: [25, 30],

});                     

LocalIntIcon = L.icon({
    iconUrl: 'libs/icons/pin-local.png',
    iconSize: [25, 30],
});                     

RestauIcon = L.icon({
    iconUrl: 'libs/icons/pin-restau.png',
    iconSize: [25, 30],
});

AccomIcon = L.icon({
    iconUrl: 'libs/icons/pin-accom.png',
    iconSize: [25, 30],
});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

        $('#inpLat').val(e.latlng.lat);
        console.log("elon is : " + e.latlng.lat);
        
        $('#inpLng').val(e.latlng.lng);
        console.log("elat is : " + e.latlng.lng)

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}