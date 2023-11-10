// Import required modules
const express = require('express');
const notesRouter = require('./notes');
const app = express();

app.use('/notes', notesRouter);

// Export module
module.exports = app;