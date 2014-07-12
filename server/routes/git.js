var config = require('../lib/config.js');
var express = require('express');
var pushover = require('pushover');
var router = express.Router();
var repos = pushover(config.repositories);

repos.on('push', function(push) {
  console.log('push ' + push.repo + '/'
              + push.commit +  ' (' + push.branch + ')');
  push.accept();
});

repos.on('fetch', function(fetch) {
  console.log('fetch ' + fetch.commit);
  fetch.accept();
});

router.use('/', function(req, res) {
  repos.handle(req, res);
});

module.exports = router;
