const { readFile } = require('fs/promises');
const fs = require('fs');

const writeToFile = (destination, content) => 
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) =>
    err ? console.error(err) : console.log(`Data written to ${destination}`)
  );

const readFromFile = async (fileName) => {
  const data = await readFile(fileName, 'utf-8', (err, data) => 
  err ? console.error(err) : data
  );

  return data;
};

const readAndAdd = async (fileName, content) => {
  const fileData = await readFromFile(fileName);
    
  const parsedData = JSON.parse(fileData);
  parsedData.push(content);
  writeToFile(fileName, parsedData);
};

const readAndDelete = async (fileName, param) => {
  const fileData = await readFromFile(fileName);

  const parsedData = JSON.parse(fileData)
  const newArr = parsedData.filter((item) => {
    return item.id !== param
  });
  writeToFile(fileName, newArr);
};

module.exports = {
  readAndAdd,
  readAndDelete,
}