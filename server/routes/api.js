var express = require('express');
var router = express.Router();
var init = require('../lib/init.js');
var run = require('../lib/run.js');

router.post('/init', init);
router.post('/run', run);

module.exports = router;
