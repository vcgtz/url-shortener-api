const rndjs = require('rndjs');
const ShortenedUrl = require('../models/shortenedUrl');

const generateRandomCode = () => {
  const code = [];

  for (let i = 0; i < 6; i++) {
    if (rndjs.getRandomBoolean()) {
      code.push(rndjs.getRandomChar());
    } else {
      code.push(`${rndjs.getRandomNumberBetween(0, 9)}`);
    }
  }

  return code;
};

const post = async (req, res) => {
  const { url, urlCode } = req.body;

  let code = urlCode;
  if (!code) {
    code = generateRandomCode().join('');
    let exists = await ShortenedUrl.existsUrlCode(urlCode);

    while (exists) {
      code = generateRandomCode().join('');
      // eslint-disable-next-line no-await-in-loop
      exists = await ShortenedUrl.existsUrlCode(urlCode);
    }
  }

  const shortenedUrl = new ShortenedUrl({
    source: url,
    urlCode: code,
  });

  try {
    await shortenedUrl.save();
  } catch (err) {
    console.error(err);

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
