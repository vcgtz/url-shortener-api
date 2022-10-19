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

  const existingShortenedUrl = await ShortenedUrl.findOne({
    source: url,
  }).exec();
  if (existingShortenedUrl) {
    return res.json({
      status: 'ok',
      data: existingShortenedUrl,
    });
  }

  let code = urlCode;
  if (!code) {
    code = generateRandomCode().join('');
    let coincidences = await ShortenedUrl.count({ urlCode: code });

    while (coincidences) {
      code = generateRandomCode().join('');
      // eslint-disable-next-line no-await-in-loop
      coincidences = await ShortenedUrl.count({ urlCode: code });
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
