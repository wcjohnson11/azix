var endHandler = function(req, res) {
  /*
    Handler for the POST received from the EC2 instance notifying of a finished
    process.

    1. Receives data with instanceId, repo, commit
    2. Verifies commit has been pushed to local git
    2. Adds completed and completeCommit to db
    3. Terminates instance

    arguments:
    req, res
    req.body is an object with { instanceId, repo, commit }
   */

  validateResult(req.body)
    .then(dbWrite)
    .then(terminateInstance)
    .catch(util.error);

};

module.exports = endHandler;
