const notes = require('express').Router();
const { readAndAdd, readAndDelete } = require('../helpers/fsUtils');
const { readFile } = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const dbPath = './db/db.json'

notes.get('/', (req, res) => {
  readFile(dbPath, 'utf-8', (err, data) => 
  err ? console.error(err) : data
  )
    .then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  const response = {
    status: 'success',
    body: newNote,
  };

  readAndAdd(dbPath, newNote)
    .then(() => res.json(response));
});

notes.delete('/:id', (req, res) => {
  const noteID = req.params.id;

  const response = {
    status: 'success',
  };
  
  readAndDelete(dbPath, noteID)
    .then(() => res.json(response));
});

module.exports = notes;