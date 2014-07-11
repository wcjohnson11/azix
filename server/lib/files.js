var path = require('path');
var repositories = require('./config.js').repositories;

module.exports.repo = function(uid) {
  return path.join(repositories, uid);
};
