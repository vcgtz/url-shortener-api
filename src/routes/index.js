const express = require('express');

const router = express.Router();
const homeRouter = require('./home');
const shortenedUrlRouter = require('./shortenedUrl');

router.use('/', homeRouter);
router.use('/shortener', shortenedUrlRouter);

module.exports = router;
