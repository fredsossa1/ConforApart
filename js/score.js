// Téléchargement de la grille de la ville
var grid = "http://donnees.ville.montreal.qc.ca/dataset/e160983c-f5d2-49ec-9b81-d0f6fb66518a/resource/d05e6306-9537-40cb-b995-1d8830febe19/download/sqrc_500.geojson";

// Definition d'un objet type de donneées
/*
function dataType(name, id, url, scale) {
    this.name = name;
    this.id = id;
    this.url = url;
    this.scale = scale;
}
*/

// On recupere la liste des donnes a telecharger
var dataTypes = [];
var dataFiles = [];
$.getJSON( "https://storage.googleapis.com/confortappart/data_list3.json", function( data){
  dataTypes = data;
  console.log(dataTypes);
  for (i = 0; i < dataTypes.nElements; i++) {
    dataFiles.push(dataTypes.elements[i].url);
  } 
  console.log(dataFiles[0]);
});



