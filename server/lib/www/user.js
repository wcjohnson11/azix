var db = require('../../db/config.js');

// Grab the list of projects from the database RunLog
var userHandler = function(req, res) {
  console.log(req.body);
  db.User.find({ username: req.body.username }, function(err, user) {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      if (!user) {
        console.log(user);
        db.User.create({username: req.body.username, password: "hi"}, function(err, user){
          if (err) {
            console.log(err)
          } else {
            res.json(201, user)
          }
        });
      }
      //maybe we have to return res.send instead?
      return res.json(200, user);
    }
  });

};


module.exports = userHandler;