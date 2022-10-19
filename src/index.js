require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/mongoose');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

const startApp = async () => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(router);

  await mongoose.connect();

  app.listen(port, () => {
    console.log(`Running on port: ${port}`);
  });
};

startApp();
