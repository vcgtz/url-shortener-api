const isUrlValid = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (err) {
    return false;
  }
};

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
  }

  return next();
};

module.exports = {
  validateNewShortenedUrl,
};
