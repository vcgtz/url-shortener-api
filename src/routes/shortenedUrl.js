const express = require('express');
const { post } = require('../controllers/shortenedUrl');
const { validateNewShortenedUrl } = require('../middlewares/validations');

const router = express.Router();

router.post('/', [validateNewShortenedUrl], post);

module.exports = router;
