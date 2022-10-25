const express = require('express');

const router = express.Router();
const homeRouter = require('./home');
const shortenedUrlRouter = require('./shortenedUrl');
const redirectorUrlRouter = require('./redirector');

router.use('/', homeRouter);
router.use('/', redirectorUrlRouter);
router.use('/shortener', shortenedUrlRouter);

module.exports = router;
