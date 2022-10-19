const { Schema, model } = require('mongoose');

const shortenedUrlSchema = new Schema(
  {
    source: {
      type: String,
      required: [true, 'The source url is required'],
    },
    urlCode: {
      type: String,
      required: [true, 'The urlCode is required'],
      minLength: 6,
      maxLength: 24,
    },
  },
  {
    timestamps: true,
    // eslint-disable-next-line prettier/prettier
  },
);

module.exports = model('ShortenedUrl', shortenedUrlSchema);
