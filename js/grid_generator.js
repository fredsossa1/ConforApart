var obj = {
    table: []
 };
 
const zoneSize = 100;
const squareSize = 0.0013;
const xStart = 45.4800;
const yStart = -73.6800;

let x = xStart;
let y = yStart;

const fs = require('fs');

 for(i = 0; i < zoneSize; i++) {
     x = xStart;
    for(j=0;j<zoneSize; j++) {
        x += squareSize;
        obj.table.push({id1: i, id2: j, coordX: x, coordY: y});
        var json = JSON.stringify(obj);
        fs.writeFile('squares_map.json', json, 'utf8', callback);
     }
     y += squareSize;
 }