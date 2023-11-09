const { readFile } = require('fs/promises');
const fs = require('fs');

const writeToFile = (destination, content) => 
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) =>
    err ? console.error(err) : console.log(`Data written to ${destination}!`)
  );

const readAndAppend = async (fileName, content) => {
  const fileData = await readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      return parsedData
    };
  });

  writeToFile(fileName, fileData);
};


module.exports = readAndAppend