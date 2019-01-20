
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


function getSquareById(x, y) {   // Fonction pour trouver un carree depuis son id
  return grid.features.find(feature => feature.properties.coordinateX == x && feature.properties.coordinateY == y);
}

function getNeighbor(radius, positionX, positionY) {   // prise des voisin d'une case en fonction du radius
  let neighbour = [];

  for(i = -radius; i <= radius; i++) {
    for(j = -radius; j <= radius; j++) {
      if(i != positionX && j != positionY) {
        neighbour.push(getSquareById(positionX + i,positionY + j));
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
      neighbour.properties.colour = "orange";
    });
  }

}
