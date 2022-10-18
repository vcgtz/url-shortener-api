require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const startApp = () => {
  app.get('/', (req, res) => {
    res.send('URL Shortener API');
  });

  app.listen(port, () => {
    console.log(`Running on port: ${port}`);
  });
};

startApp();
