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
  }
);

// eslint-disable-next-line func-names
shortenedUrlSchema.statics.existsUrlCode = async function (code) {
  return (await this.count({ urlCode: code })) > 0;
};

module.exports = model('ShortenedUrl', shortenedUrlSchema);
