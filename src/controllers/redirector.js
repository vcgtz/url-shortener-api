const ShortenedUrl = require('../models/shortenedUrl');

const redirect = async (req, res) => {
  const { code } = req.params;

  if (!code || !(await ShortenedUrl.existsUrlCode(code))) {
    return res.status(404).json({
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

    return res.redirect(301, shortenedUrl.source);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      status: 'err',
      errors: [{ message: 'A problem has ocurred, please try again' }],
    });
  }
};

module.exports = {
  redirect,
};
