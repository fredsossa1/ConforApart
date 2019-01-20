
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