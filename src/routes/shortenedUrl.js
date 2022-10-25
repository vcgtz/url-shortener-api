const express = require('express');
const { store } = require('../controllers/shortenedUrl');
const { validateNewShortenedUrl } = require('../middlewares/validations');

const router = express.Router();

router.post('/', [validateNewShortenedUrl], store);

module.exports = router;
