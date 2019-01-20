//var quadrillageSourceLink = "http://donnees.ville.montreal.qc.ca/dataset/e160983c-f5d2-49ec-9b81-d0f6fb66518a/resource/d05e6306-9537-40cb-b995-1d8830febe19/download/sqrc_500.geojson";
var punaiseSourceLink = "https://storage.googleapis.com/confortappart/declarations-exterminations-punaises-de-lit.geojson";

var quadrillagePoints = [];
var punaisePoints = [];
var heatmapData = [];
var map;

/*function loadQuadrillageData() {
    //Récupération des données du serveur
    $.get(quadrillageSourceLink).then((response) => {

            var temp = JSON.parse(response);
            quadrillagePoints = temp.features;

            //console.log (quadrillagePoints[0].geometry.coordinates);

        })
        .fail((error) => {
            console.log("Error loading file");
        });
}*/

function loadPunaisesData() {
    $.get(punaiseSourceLink).then((response) => {
            console.log("response");

            var temp = JSON.parse(response);
            punaisePoints = temp.features;

            //console.log (punaisePoints[2].geometry.coordinates);
            //console.log (punaisePoints.length);
            //heatmapData.push(new google.maps.LatLng(punaisePoints[2].geometry.coordinates[1], punaisePoints[2].geometry.coordinates[0]));

            for (var i = 0; i < 20; i++) {
                //console.log (punaisePoints[i].geometry.coordinates);
                var coords = punaisePoints[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);

                heatmapData.push(latLng);

                /*var magnitude = punaisePoints[i].properties.mag;
                var weightedLoc = {
                    location: latLng,
                    weight: 0.005
                };
                heatmapData.push(weightedLoc);*/
            }

        })
        .fail((error) => {
            console.log("Error loading file");
        });


}

function placerMarqueur(latitude, longitude) {
    /*map = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 17,
    };
    map = new google.maps.Map(document.getElementById("map"), map);*/
    var myCenter = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: myCenter
    });
    marker.setMap(map);
}

function initialiserMap() {
    map = {
        center: new google.maps.LatLng(45.50364, -73.61503),
        zoom: 14,
        radius: 0.2,
        gestureHandling : "none",
        zoomControl: false
        //mapTypeId: 'satellite'
    };
    map = new google.maps.Map(document.getElementById("map"), map);

    /* var request = {
         query: 'Museum of Contemporary Art Australia',
         fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],    
       };
     
       var service = new google.maps.places.PlacesService(map);
       service.findPlaceFromQuery(request, callMe);*/


}

function eqfeed_callback() {

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        dissipating: false,
        map: map
    });

}

function searchAddress(address) {
    var queryText = document.getElementById("queryText").value;
    queryText = queryText.replace(/\s+/g, "+");
    var finalQuery = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    finalQuery = finalQuery.concat(queryText, "&key=AIzaSyDRCGXHP810yZ8cXGSTnAEHANDbdY6HNP4");

    console.log(finalQuery);

    $.getJSON(finalQuery, function (data) {
        dataTypes = data;

        var lat = data.results[0].geometry.location.lat;
        var long = data.results[0].geometry.location.lng;

        placerMarqueur(lat, long);
    });
    
   
}

$(document).ready(function () {

    initialiserMap();
    //placerMarqueur(null, null);
    loadPunaisesData();
    eqfeed_callback();

    var submitButton = $("#searchButton");
    submitButton.click(function () {
        var getval = ($("#queryText").val());
        searchAddress(getval);
    });


});