const mongoose = require('mongoose');

const connect = async (options = {}) => {
  const { hideLogs } = options;

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    if (!hideLogs) {
      console.log('Database Online');
    }
  } catch (err) {
    console.error(err);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  connect,
  disconnect,
};
