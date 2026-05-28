const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const filePath = '/Users/salonsh/Desktop/mokey maker/new shit/viator.csv';
let rowCount = 0;
fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => {
    if (rowCount === 0) {
      console.log("First row data:", data);
    }
    rowCount++;
  })
  .on('end', () => {
    console.log("Total rows:", rowCount);
  });
