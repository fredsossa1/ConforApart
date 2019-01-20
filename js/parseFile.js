//var quadrillageSourceLink = "http://donnees.ville.montreal.qc.ca/dataset/e160983c-f5d2-49ec-9b81-d0f6fb66518a/resource/d05e6306-9537-40cb-b995-1d8830febe19/download/sqrc_500.geojson";
var punaiseSourceLink = "https://storage.googleapis.com/confortappart/declarations-exterminations-punaises-de-lit.geojson";

var quadrillagePoints = [];
var punaisePoints = [];
var heatmapData = [];
var map;
var geoJsonData;

function loadPunaisesData() {
    $.get(punaiseSourceLink).then((response) => {

            var temp = JSON.parse(response);
            punaisePoints = temp.features;


            for (var i = 0; i < 20; i++) {
                var coords = punaisePoints[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);

                heatmapData.push(latLng);

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
        //gestureHandling: "none",
        //zoomControl: false
        //mapTypeId: 'satellite'
    };
    map = new google.maps.Map(document.getElementById("map"), map);

}

function eqfeed_callback() {

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        dissipating: false,
        map: map
    });

}

function drawSquaresWithColor() {
    var lastLink = "https://storage.googleapis.com/confortappart/grid_color.geojson"

    $.get(lastLink).then((response) => {

            geoJsonData = JSON.parse(response);
           // console.log(geoJsonData);

            map.data.addGeoJson(geoJsonData);

            map.data.setStyle(function (feature) {
                var color = feature.getProperty('colour');
                var score = feature.getProperty('score');
                return {
                    fillColor: color,
                    strokeWeight: 1
                }
            });

        })
        .fail((error) => {
            console.log("Error loading file");
        });

    //console.log(geoJsonData);
    /*map.data.addGeoJson(geoJsonData);

    map.data.setStyle(function (feature) {
        var color = feature.getProperty('colour');
        var score = feature.getProperty('score');
        return {
            fillColor: color,
            strokeWeight: 1
        }
    });*/
}
let corresponding_case = 0;
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
        let grid = localStorage.getItem("Coord");
        grid = JSON.parse(grid);

        
        for (r = 0; r < grid.features.length; r++) {
            if (lat > grid.features[r].geometry.coordinates[0][0][1] && lat < grid.features[r].geometry.coordinates[0][1][1]) {
                if (long > grid.features[r].geometry.coordinates[0][0][0] && long < grid.features[r].geometry.coordinates[0][3][0]) {
                    corresponding_case = r;
                    document.querySelector('.scoring').innerHTML = geoJsonData.features[corresponding_case].properties.score;
                    break;
                }
            }
        }
        
    });
    console.log(corresponding_case);
    


}

$(document).ready(function () {

    console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");

    initialiserMap();
    //placerMarqueur(null, null);
    loadPunaisesData();
    eqfeed_callback();

    var submitButton = $("#searchButton");
    submitButton.click(function () {
        var getval = ($("#queryText").val());
        searchAddress(getval);
    });

    drawSquaresWithColor();


});