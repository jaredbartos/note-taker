const { readFile } = require('fs/promises');
const fs = require('fs');

const writeToFile = (destination, content) => 
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) =>
    err ? console.error(err) : console.log(`Data written to ${destination}`)
  );

const readAndAdd = async (fileName, content) => {
  const fileData = await readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    } else {
      return data;
    };
  });
    
  const parsedData = JSON.parse(fileData);
  parsedData.push(content);
  writeToFile(fileName, parsedData);
};

const readAndDelete = async (fileName, param) => {
  
}

module.exports = readAndAdd