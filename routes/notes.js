// Import required modules
const notes = require('express').Router();
const { readAndAdd, readAndDelete } = require('../helpers/fsUtils');
const { readFile } = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

// Declare database path variable
const dbPath = './db/db.json'

//GET route to retrieve notes
notes.get('/', (req, res) => {
  readFile(dbPath, 'utf-8', (err, data) => 
  err ? console.error(err) : data
  )
    .then((data) => res.json(JSON.parse(data)));
});

// POST route to handle requests for new notes
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

// DELETE route to handle requests to delete notes
notes.delete('/:id', (req, res) => {
  const noteID = req.params.id;

  const response = {
    status: 'success',
  };
  
  readAndDelete(dbPath, noteID)
    .then(() => res.json(response));
});

// Export module
module.exports = notes;