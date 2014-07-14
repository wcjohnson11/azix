

var runHandler = function(req, res) {
  /*
    Main handler for the POST received from the command line run command

    1. Receives data with client project info
    2. Checks to see if that client/project combo is already running a process
      - if so, return an error
    3. Start EC2 instance
    4. Create an entry in runLogs db with:
      - user, project, startCommit, startedtime, instanceId
    5. Send POST to EC2 instance with repo endpoint and commit sha?

    arguments:
    req, res
    req.body will be an object with { username, project }
   */
};
