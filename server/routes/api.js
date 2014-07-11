var express = require('express');
var router = express.Router();
var init = require('../lib/init.js');

router.post('/init', init);

module.exports = router;
