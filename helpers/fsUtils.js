// Import required modules
const { readFile } = require('fs/promises');
const fs = require('fs');

// Function to write data to file
const writeToFile = (destination, content) => 
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) =>
    err ? console.error(err) : console.log(`Data written to ${destination}`)
  );

// Async function to get data from file
const readFromFile = async (fileName) => {
  const data = await readFile(fileName, 'utf-8', (err, data) => 
  err ? console.error(err) : data
  );

  return data;
};

// Async function to update file with new content
const readAndAdd = async (fileName, content) => {
  const fileData = await readFromFile(fileName);
    
  const parsedData = JSON.parse(fileData);
  parsedData.push(content);
  writeToFile(fileName, parsedData);
};

// Async function to update file by omitting selected data
const readAndDelete = async (fileName, param) => {
  const fileData = await readFromFile(fileName);

  const parsedData = JSON.parse(fileData)
  const newArr = parsedData.filter((item) => {
    return item.id !== param
  });
  writeToFile(fileName, newArr);
};

// Export module
module.exports = {
  readAndAdd,
  readAndDelete,
};