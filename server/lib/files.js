var path = require('path');

module.exports.bareRepo = 'assets/bareRepo.git';
module.exports.repositories = repositories = 'assets/repositories';

module.exports.repo = function(uid) {
  return path.join(repositories, uid);
};
