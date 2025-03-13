const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use('/', routes); //route für fragen und members

// Verbinde mit MongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.once('open', () => {
  console.log('connected to DB');
});

// Starte den Server
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started and listening on port ${PORT} ... `);
  }
});
