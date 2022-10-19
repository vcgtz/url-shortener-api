const ShortenedUrl = require('../models/shortenedUrl');

const post = async (req, res) => {
  const { url } = req.body;
  const shortenedUrl = new ShortenedUrl({
    source: url,
    urlCode: '123456',
  });

  try {
    await shortenedUrl.save();
  } catch (err) {
    return res.status(500).json({
      status: 'err',
      errors: [
        { message: 'A problem has ocurred generating the shortened url' },
      ],
    });
  }

  return res.json({
    status: 'ok',
    data: shortenedUrl,
  });
};

module.exports = {
  post,
};
