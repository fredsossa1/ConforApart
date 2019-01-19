var sourceLink = "http://donnees.ville.montreal.qc.ca/dataset/e160983c-f5d2-49ec-9b81-d0f6fb66518a/resource/d05e6306-9537-40cb-b995-1d8830febe19/download/sqrc_500.geojson";
var quadrillagePoints = [];

function loadData() {
    //Récupération des données du serveur
    $.get(sourceLink).then((response) => {
        console.log("response");
           
        //console.log(response);

        var temp = JSON.parse(response);
        quadrillagePoints = temp.features;

        console.log (quadrillagePoints[0].geometry.coordinates);
            
        })
        .fail((error) => {
            console.log("response");
        });
}

$(document).ready(function () {
    
    loadData();
});
