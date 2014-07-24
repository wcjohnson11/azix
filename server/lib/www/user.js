var db = require('../../db/config.js');

// Grab the list of projects from the database RunLog
var userHandler = function(req, res) {
  db.User.find({ user: req.params.user }, function(err, user) {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      if (!user) {
        console.log(user);
      }
      //maybe we have to return res.send instead?
      return res.json(200, user);
    }
  });

};


module.exports = userHandler;