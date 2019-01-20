var obj = {
    type: "FeatureCollection",
    features: []
};

// DEclaration des variables
const zoneSize = 30;
const squareSize = 0.0020;
const xStart = 45.4900;
const yStart = -73.6400;

let x = xStart;
let y = yStart;

let xPlus1 = xStart;
let yPlus1 = yStart;

for (i = 0; i < zoneSize; i++) {
    x = xStart;
    for (j = 0; j < zoneSize; j++) {
        xPlus1 = x + squareSize;
        yPlus1 = y + squareSize;

        obj.features.push({
            type: "Feature",
            properties: {
                coordinateX: i,
                coordinateY: j,
                colour: "green",
                score: 0,
            },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [y,x],
                        [y,xPlus1],
                        [yPlus1,xPlus1],
                        [yPlus1,x],
                        [y,x]
                    ]
                ]
            }
        });
        x += squareSize;
    }
    y += squareSize;
}
var json = JSON.stringify(obj);
localStorage.setItem("Coord", json);

console.log(localStorage.getItem('Coord'));

//let coord = localStorage.getItem('Coord');