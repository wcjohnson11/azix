var files = require('./files.js');
var host = require('./config.js').host;
var path = require('path');
var ncp = require('ncp').ncp;
var git = require('gift');
var Q = require('q');

module.exports.clone = clone = function(dest, source) {
  var deferred = Q.defer();
  if (source === undefined) {
    source = files.bareRepo;
  }
  git.clone(source, dest, deferred.makeNodeResolver());
  return deferred.promise;
};

module.exports.cloneBare = function(dest) {
  var deferred = Q.defer();
  ncp(files.bareRepo, dest, function(err) {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(dest);
    }
  });
  return deferred.promise;
}

module.exports.createRepoUID = function(obj) {
  /*
    Creates a unique identifier to use as a repo name.
   */
  return obj.username;
};

module.exports.createEndpoint = function(file) {
  return path.join(host + ':', __dirname, file);
};
