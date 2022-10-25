const express = require('express');
const { redirect } = require('../controllers/redirector');

const router = express.Router();

router.get('/:code', redirect);

module.exports = router;
