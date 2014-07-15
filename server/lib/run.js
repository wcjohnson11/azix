var util = require('./util.js');
var config = require('./config.js');
var db = require('../db/config.js');
var AWS = require('aws-sdk');
var EC2 = require('ec2-event');
var _ = require('underscore');
var Q = require('q');

var awsConfig = {
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
  region: "us-east-1"
};

_.defaults(AWS.config, awsConfig);

var ec2Config = {
  ImageId: config.ami,
  InstanceType: 't1.micro',
  MinCount: 1,
  MaxCount: 1,
  KeyName: 'sd'
};

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

  validateRun(req.body)
    .catch(function(e) {
      console.log(e);
      res.send(400, e.message);
      throw e;
    })
    .then(vmStart)
    .then(dbWrite)
    .then(function() {
      res.send(201, "Process started");
    })
    .catch(util.error);

};

var validateRun = function(obj) {
  return Q.all([
    validateProject(obj),
    validateRunLog(obj)
  ]);
};

var validateProject = function(obj) {
  var deferred = Q.defer();
  util.findRepo(obj)
    .then(function(data) {
      if (!data.length) {
        deferred.reject(new Error("Project doesn't exist"));
      } else if (data.length > 1) {
        var err = new Error(
          "run.validateProject returned more than one repository"
        );
        deferred.reject(err);
      } else {
        deferred.resolve(data[0]);
      }
    });
  return deferred.promise;
};

var validateRunLog = function(obj) {
  var deferred = Q.defer();
  util.findRunLog(obj, 'running')
    .then(function(data) {
      if (data.length) {
        deferred.reject(new Error("Project already running"));
      } else {
        deferred.resolve(true);
      }
    });
  return deferred.promise;
};

var vmStart = function(arr) {
  var deferred = Q.defer();
  var obj = arr[0];
  var ec2 = new EC2(ec2Config);

  ec2.on('starting', function() {
    obj.instanceId = ec2.instanceIds[0];
    deferred.resolve(obj);
  });

  ec2.on('running', function() {
    ec2.terminate();
  });

  ec2.start();

  return deferred.promise;
};

var dbWrite = function(obj) {
  var deferred = Q.defer();
  new db.RunLog({
    user: obj.user,
    project: obj.project,
    instanceId: obj.instanceId,
    startCommit: 'abc',
    ami: config.ami
  }).save(deferred.makeNodeResolver());
  return deferred.promise;
};

module.exports = runHandler;
