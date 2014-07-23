var Q = require('q');
var db = require('../db/config.js');

// Grab the list of projects from the database RunLog
var listHandler = function(req, res) {
  db.RunLog.find({ user: req.params.user }, function(err, docs) {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      console.log(docs);
      //maybe we have to return res.send instead?
      return res.render('list', { user: req.params.user, docs: docs });
    }
  });

};


module.exports = listHandler;