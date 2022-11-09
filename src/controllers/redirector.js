const ShortenedUrl = require('../models/shortenedUrl');
const status = require('../constants/status');

const redirect = async (req, res) => {
  const { code } = req.params;

  if (!code || !(await ShortenedUrl.existsUrlCode(code))) {
    return res.status(status.NOT_FOUND).json({
      status: 'err',
      errors: [
        {
          message: "The urlCode doesn't exist",
        },
      ],
    });
  }

  try {
    const shortenedUrl = await ShortenedUrl.findOne({ urlCode: code }).exec();

    return res.redirect(status.TEMPORARY_REDIRECT, shortenedUrl.source);
  } catch (err) {
    console.error(err);

    return res.status(status.SERVER_ERROR).json({
      status: 'err',
      errors: [{ message: 'A problem has ocurred, please try again' }],
    });
  }
};

module.exports = {
  redirect,
};
