
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
$.getJSON( "https://storage.googleapis.com/confortappart/data_list3.json", function(data){
  dataTypes = data;
  console.log(dataTypes.nElements);

  for (i = 0; i < dataTypes.nElements; i++) {
    
    $.getJSON(dataTypes.elements[i].url, function(element){
      console.log("hey");
      dataFiles[i] = element.features;
      
    })
  }
  
});




/*

// On recupere la grille generee
let grid = localStorage.getItem("Coord");


// On recupere le nombre d'incident relevé dans la case selon le type de données
function isIn(idCase, idType) {
  let data_size = dataFiles.elements.length;
  let nFound = 0;
  for (i=0; i < data_size; i++) {
  }
}

for (i=0; i < grid.features.length; i++) {
    grid.features[i].geometry.coordinates[0][0]
};
*/