const notes = require('express').Router();
const readAndAdd = require('../helpers/fsUtils');
const { readFile } = require('fs/promises');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = './db/db.json'

notes.get('/', (req, res) => {
  readFile('./db/db.json', 'utf-8', (err, data) => 
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

  readAndAdd('./db/db.json', newNote)
    .then(() => res.json(response))
});

notes.delete('/:id', (req, res) => {
  const noteID = req.params.id;

  const response = {
    status: 'success',
  }
  
  readFile('./db/db.json', 'utf-8', (err, data) => 
  err ? console.error(err) : data
  )
    .then((data) => {
      const parsedData = JSON.parse(data);

      const newArr = parsedData.filter((item) => {
        return item.id !== noteID
      });

      return newArr
    })
    .then((data) => {
      fs.writeFile(db, JSON.stringify(data, null, 2), (err) =>
        err ? console.err(err) : console.log('Note deleted!')
      );
      res.json(response);
    })
})

module.exports = notes;