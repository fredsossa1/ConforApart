var obj = {
    type: "FeatureCollection",
    features: []
};

const zoneSize = 10;
const squareSize = 0.0013;
const xStart = 45.4800;
const yStart = -73.6800;

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
                coordinates: i+":"+j
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