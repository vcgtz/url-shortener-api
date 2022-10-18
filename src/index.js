require('dotenv').config();
const express = require('express');
const mongoose = require('./config/mongoose');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

const startApp = async () => {
  app.use(router);

  await mongoose.connect();

  app.listen(port, () => {
    console.log(`Running on port: ${port}`);
  });
};

startApp();
