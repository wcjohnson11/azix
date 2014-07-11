var util = require('./util.js');
var repo = require('./files.js').repo;
var db = require('../db/config.js');
var Q = require('q');

var initHandler = function(req, res) {
  /*
    Main handler for the POST received from the command line init command

    1. Receives data with client info
    2. Checks if project already exists
    3. Creates uid with that data
    4. Clones (forks?) base repo
    5. Adds Repo data to DB
    6. Sends back data to client { uid, repoEndpoint }

    arguments:
    req, res
    req.body will be an object with { username, timestamp, projectname }
   */

  validateInit(req.body)
    .catch(function(e) {
      res.send(400, e.message);
      throw e;
    })
    .then(initRepo)
    .then(function(data) {
      res.send({ endpoint: data.endpoint });
    })
    .catch(util.error);

};

var initRepo = function(obj) {
  var deferred = Q.defer();
  var uid = util.createRepoUID(obj);
  var repoPath = repo(uid);

  util.cloneBare(repoPath)
    .then(function(dest) {
      var endpoint = util.endpoint(dest);
      new db.Repo({
        user: obj.username,
        project: obj.projectname,
        endpoint: endpoint
      }).save(function(err, result) {
        if (err) {
          deferred.reject(new Error(err));
        } else {
          deferred.resolve(result);
        }
      });
    });

  return deferred.promise;
};

var validateInit = function(obj) {
  var deferred = Q.defer();
  var valid = util.validateObj(obj, ['username', 'projectname', 'timestamp']);
  if (!valid) { deferred.reject(new Error('Invalid data')); }
  findRepo(obj)
    .then(function(data) {
      if (data.length) {
        deferred.reject(new Error("Project already exists"));
      } else {
        deferred.resolve(obj);
      }
    });
  return deferred.promise;
};

var findRepo = function(obj) {
  var deferred = Q.defer();
  var query = {
    user: obj.username,
    project: obj.projectname
  };
  db.Repo.find(query, deferred.makeNodeResolver());
  return deferred.promise;
};

module.exports = initHandler;
