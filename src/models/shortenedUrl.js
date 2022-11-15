const { Schema, model } = require('mongoose');
const UniqueId = require('./uniqueId');
const { convertToBase62 } = require('../helpers/numbers');

const shortenedUrlSchema = new Schema(
  {
    source: {
      type: String,
      required: [true, 'The source url is required'],
    },
    urlCode: {
      type: String,
      minLength: 1,
      maxLength: 24,
    },
    uniqueId: {
      type: Schema.Types.ObjectId,
      ref: 'UniqueID',
    },
  },
  {
    timestamps: true,
    // eslint-disable-next-line prettier/prettier
  },
);

// eslint-disable-next-line func-names
shortenedUrlSchema.statics.existsUrlCode = async function (code) {
  return (await this.count({ urlCode: code })) > 0;
};

// eslint-disable-next-line func-names
shortenedUrlSchema.pre('save', async function (next) {
  try {
    const currentId = await UniqueId.count({});
    const uniqueId = new UniqueId({
      value: currentId + 1,
    });

    await uniqueId.save();

    this.uniqueId = uniqueId;
    this.urlCode = convertToBase62(uniqueId.value);
  } catch (err) {
    console.log(err);
  }

  next();
});

module.exports = model('ShortenedUrl', shortenedUrlSchema);
