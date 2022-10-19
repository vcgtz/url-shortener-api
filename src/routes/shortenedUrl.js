const express = require('express');
const { post } = require('../controllers/shortenedUrl');

const router = express.Router();

router.post('/', post);

module.exports = router;
