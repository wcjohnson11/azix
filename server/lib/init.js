var util = require('./util.js');
var repo = require('./files.js').repo;

var initHandler = function(req, res) {
  /*
    Main handler for the POST received from the command line init command

    1. Receives data with client info
    2. Creates uid with that data
    3. Clones (forks?) base repo
    4. Adds Repo data to DB
    4. Sends back data to client { uid, repoEndpoint }

    arguments:
    req, res
    req.body will be an object with { username, timestamp, projectname }
   */

  var uid = util.createRepoUID(req.body);
  util.cloneBare(repo(uid))
    .then(util.endpoint)
    .then(function(data) {
      res.send({ endpoint: data });
    })
    .catch(util.error);


};

module.exports = initHandler;
