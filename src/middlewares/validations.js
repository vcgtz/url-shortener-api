const { isUrlValid } = require('../helpers/url');
const { isAlphaNumeric } = require('../helpers/strings');
const ShortenedUrl = require('../models/shortenedUrl');

const validateNewShortenedUrl = (req, res, next) => {
  const { url, urlCode } = req.body;

  if (!isUrlValid(url)) {
    return res.status(400).json({
      status: 'err',
      errors: [
        {
          message: 'The url is not valid',
        },
      ],
    });
  }

  if (urlCode) {
    if (ShortenedUrl.existsUrlCode(urlCode)) {
      return res.status(404).json({
        status: 'err',
        errors: [
          {
            message: 'The urlCode is not available',
          },
        ],
      });
    }

    if (urlCode.length < 6 || urlCode.length > 24) {
      return res.status(400).json({
        status: 'err',
        errors: [
          {
            message:
              'The urlCode must have a lengh between 6 and 24 characters',
          },
        ],
      });
    }

    if (!isAlphaNumeric(urlCode)) {
      return res.status(400).json({
        status: 'err',
        errors: [
          {
            message: 'The urlCode must contain only alphanumeric characters',
          },
        ],
      });
    }
  }

  return next();
};

module.exports = {
  validateNewShortenedUrl,
};
