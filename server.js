// Import required modules
const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/index');

// Set PORT variable for server based on Heroku documentation
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

// Middleware
app.use(express.json());
app.use('/api', api);
app.use(express.static('public'));

// GET route for index HTML
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes HTML
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Set app to listen to designated port
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);