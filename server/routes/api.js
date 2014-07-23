var express = require('express');
var router = express.Router();
var init = require('../lib/init.js');
var run = require('../lib/run.js');
var end = require('../lib/end.js');
var list = require('../lib/list.js');

router.post('/init', init);
router.post('/run', run);
router.post('/end', end);
router.get('/:user/projects', list)

module.exports = router;
