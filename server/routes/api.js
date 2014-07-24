var express = require('express');
var router = express.Router();
var init = require('../lib/init.js');
var run = require('../lib/run.js');
var end = require('../lib/end.js');
var list = require('../lib/www/list.js');
var user = require('../lib/www/user.js');

//Original routes
router.post('/init', init);
router.post('/run', run);
router.post('/end', end);

//For web interface
router.post('/create', user)
router.get('/:user/projects', list)

module.exports = router;
