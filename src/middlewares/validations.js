const { isUrlValid } = require('../helpers/url');
const status = require('../constants/status');

const validateNewShortenedUrl = async (req, res, next) => {
  const { url } = req.body;

  if (!isUrlValid(url)) {
    return res.status(status.BAD_REQUEST).json({
      status: 'err',
      errors: [
        {
          message: 'The url is not valid',
        },
      ],
    });
  }

  return next();
};

module.exports = {
  validateNewShortenedUrl,
};
