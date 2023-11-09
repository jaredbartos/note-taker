const notes = require('express').Router();
const readAndAppend = require('../helpers/fsUtils');
const { readFile } = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
  readFile('./db/db.json', 'utf-8', (err, data) => 
  err ? console.error(err) : data
  )
    .then((data) => res.json(JSON.parse(data)))
});


module.exports = notes;