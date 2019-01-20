
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

// On recupere la grille generee
let grid = localStorage.getItem("Coord");


for (i=0; i < grid.features.length; i++) {
    grid.features[i].geometry.coordinates[0][0]
};
