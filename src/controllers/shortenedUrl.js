const ShortenedUrl = require('../models/shortenedUrl');
const status = require('../constants/status');

const store = async (req, res) => {
  const { url } = req.body;

  const shortenedUrl = new ShortenedUrl({
    source: url,
  });

  try {
    await shortenedUrl.save();
  } catch (err) {
    console.error(err);

    return res.status(status.SERVER_ERROR).json({
      status: 'err',
      errors: [
        { message: 'A problem has ocurred generating the shortened url' },
      ],
    });
  }

  return res.status(status.OK).json({
    status: 'ok',
    data: shortenedUrl,
  });
};

module.exports = {
  store,
};
