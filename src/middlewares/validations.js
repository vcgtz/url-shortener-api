const { isUrlValid } = require('../helpers/url');
const { isAlphaNumeric } = require('../helpers/strings');
const ShortenedUrl = require('../models/shortenedUrl');
const status = require('../constants/status');

const validateNewShortenedUrl = async (req, res, next) => {
  const { url, urlCode } = req.body;

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

  if (urlCode) {
    if (await ShortenedUrl.existsUrlCode(urlCode)) {
      return res.status(status.NOT_FOUND).json({
        status: 'err',
        errors: [
          {
            message: 'The urlCode is not available',
          },
        ],
      });
    }

    if (urlCode.length < 6 || urlCode.length > 24) {
      return res.status(status.BAD_REQUEST).json({
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
      return res.status(status.BAD_REQUEST).json({
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
