require('dotenv').config();
console.log('DB_CONNECTION:', process.env.DB_CONNECTION); // Debug

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use('/', routes);

// Verbinde mit MongoDB
const dbConnection = process.env.DB_CONNECTION;
if (!dbConnection) {
    throw new Error('DB_CONNECTION environment variable is not defined');
}

mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Starte den Server
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started and listening on port ${PORT} ... `);
  }
});


