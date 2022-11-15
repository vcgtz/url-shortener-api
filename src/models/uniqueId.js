const { Schema, model } = require('mongoose');

const uniqueIdSchema = new Schema({
  value: {
    type: Number,
    default: 0,
  },
});

module.exports = model('UniqueID', uniqueIdSchema);
