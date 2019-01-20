
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
$.getJSON( "https://storage.googleapis.com/confortappart/data_list4.json", function(data){ // Ici on telecharge la data_list
  dataTypes = data;
  
  for (i = 0; i < dataTypes.nElements; i++) { // Ici on telecharge l'ensemble des donnees identifiées dans le data_list
  
    $.getJSON(dataTypes.elements[0].url, function(element){
      dataFiles[0] = element.features;
      done();
    })
  }
  
});


// On recupere la grille generee
let grid = localStorage.getItem("Coord");
grid = JSON.parse(grid);

// On recupere le nombre d'incident relevé dans la case selon le type de données
function nIncident(idCase, idType) {
  let data_size = dataFiles[idType].length;
  let nFound = 0;
  for (a=0; a < data_size; a++) {
    let dataX = dataFiles[idType][a].properties.LATITUDE;
    let dataY = dataFiles[idType][a].properties.LONGITUDE;
    if (dataX > grid.features[idCase].geometry.coordinates[0][0][1] && dataX < grid.features[idCase].geometry.coordinates[0][1][1]) {
      if (dataY > grid.features[idCase].geometry.coordinates[0][0][0] && dataY < grid.features[idCase].geometry.coordinates[0][3][0]) {
        nFound = nFound+1;
      }
    }
  }
  return nFound;
}

function UpdateScore( idCase, idType, triggeredPoints){
  var impactScore;
  for (b = 0; b < dataTypes.nElements; b++) {
   if(dataTypes.elements[b].id == idType){
      if(triggeredPoints >= dataTypes.elements[b].scale[0].trigger_point){
        impactScore = dataTypes.elements[b].scale[0].impact;
        grid.features[idCase].properties.colour = "red";
      }
        
      if(triggeredPoints >= dataTypes.elements[b].scale[1].trigger_point && triggeredPoints < dataTypes.elements[b].scale[0].trigger_point){
        impactScore = dataTypes.elements[b].scale[1].impact;
        grid.features[idCase].properties.colour = "orange";
      }

      if(triggeredPoints >= dataTypes.elements[b].scale[2].trigger_point && triggeredPoints < dataTypes.elements[b].scale[1].trigger_point){
        impactScore = dataTypes.elements[b].scale[2].impact;
      }
   }
  }
  

  /*$.getJSON( "https://storage.googleapis.com/confortappart/generation_map.geojson", function(data){
    townSquares = data;
    console.log(townSquares);
    townSquares.features[idCase].properties.score = impactScore;
  });*/
  grid.features[idCase].properties.score = impactScore;
}


function getSquareById(x, y) {   // Fonction pour trouver un carree depuis son id
  return grid.features.find(feature => feature.properties.coordinateX == x && feature.properties.coordinateY == y);
}

function getNeighbor(radius, positionX, positionY) {   // prise des voisin d'une case en fonction du radius
  let neighbour = [];

  for(c = -radius; c <= radius; c++) {
    for(d = -radius; d <= radius; d++) {
      if(c != positionX && d != positionY) {
        neighbour.push(getSquareById(positionX + c,positionY + d));
      }
    }
  }

  return neighbour;
}


function adjacentScore(coordinateX, coordinateY, idType) {      // Fonction qui colorie les case voisine d'une couleur inferieur
  let square = grid.features.find( feature => {
      return feature.properties.coordinateX == coordinateX && feature.properties.coordinateY == coordinateY;
  });

  if (!square) {
    return;
  }
  
  let type = dataTypes.elements.find( element => element.id == idType);
  let redRadius = type.scale.find(s => s.color == "red").radius;
  let orangeRadius = type.scale.find(s => s.color == "orange").radius;
  let greenRadius = type.scale.find(s => s.color == "green").radius;

  /*switch(square.properties.colour) {
    case "red":
      if(redRadius > 0) {
        
      }
  }*/

  if (square.properties.colour == "red") {
    getNeighbor(redRadius, square.properties.coordinateX, square.properties.coordinateY)
    .forEach(neighbour => {
      if(neighbour.properties.colour != "red") {
        neighbour.properties.colour = "orange";
      }
    });
  }

}

function done() {
  
  for(P=0; P<grid.features.length; P++)  {
    let nFound = nIncident(P,0);
    UpdateScore(P,0,nFound);
    adjacentScore(grid.features[P].properties.coordinateX, grid.features[P].properties.coordinateY, 0);
  }

  var json = JSON.stringify(grid);
  localStorage.setItem("Grid", json);

  console.log(localStorage.getItem('Grid'));
  
  //console.log(grid);
}