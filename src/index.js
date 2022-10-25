require('dotenv').config();
const mongoose = require('./config/mongoose');
const app = require('./server');

const port = process.env.PORT || 3000;

const startApp = async () => {
  await mongoose.connect();

  app.listen(port, () => {
    console.log(`Running on port: ${port}`);
  });
};

startApp();
