const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Database Online');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  connect,
};
