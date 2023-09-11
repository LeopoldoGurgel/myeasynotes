// importing npm packages and declaring express, app middleware and port
const express = require('express');
const path = require('path');
const api = require('./public/assets/js/routes.js')

const PORT = process.env.PORT || 3001;
const db = require('./db/db.json')

const app = express();

// putting middleware to parse JSon
app.use(express.json());
app.use('/api', api);

app.use(express.static('public'));

// declaring routes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);