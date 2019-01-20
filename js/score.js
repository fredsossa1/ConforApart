
// Definition d'un objet type de donneées
/*
function dataType(name, id, url, scale) {
    this.name = name;
    this.id = id;
    this.url = url;
    this.scale = scale;
}
*/

// On recupere la liste des donnees a telecharger
var dataTypes = []; //Ceci contient data_list
var dataFiles = []; //Ceci contient les fichers de données
$.getJSON( "https://storage.googleapis.com/confortappart/data_list3.json", function(data){ // Ici on telecharge la data_list
  dataTypes = data;
  console.log(dataTypes.nElements);

  for (i = 0; i < dataTypes.nElements; i++) { // Ici on telecharge l'ensemble des donnees identifiées dans le data_list
    
    $.getJSON(dataTypes.elements[i].url, function(element){
      dataFiles[i] = element.features;
    })
  }
  
});


// On recupere la grille generee
let grid = localStorage.getItem("Coord");


// On recupere le nombre d'incident relevé dans la case selon le type de données
function nIncident(idCase, idType) {
  let data_size = dataFiles[idType].length;
  let nFound = 0;
  for (i=0; i < data_size; i++) {
    let dataX = dataFiles[idType][i].geometry.coordinates[0];
    let dataY = dataFiles[idType][i].geometry.coordinates[1];
    if (dataX > grid.features.geometry.coordinates[0][1] && dataX < grid.features.geometry.coordinates[1][1]) {
      if (dataY > grid.features.geometry.coordinates[0][0] && dataY < grid.features.geometry.coordinates[3][0]) {
        nFound = nFound =1;
      }
    }
  }
  return nFound;
}

