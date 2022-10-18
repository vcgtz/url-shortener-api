require('dotenv').config();
const express = require('express');
const mongoose = require('./config/mongoose');

const app = express();
const port = process.env.PORT || 3000;

const startApp = async () => {
  app.get('/', (req, res) => {
    res.send('URL Shortener API');
  });

  await mongoose.connect();

  app.listen(port, () => {
    console.log(`Running on port: ${port}`);
  });
};

startApp();
