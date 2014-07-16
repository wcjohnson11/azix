var config = require('../lib/config.js');
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://' + config.dbhost + '/' + config.dbname);

var repoSchema = new Schema({
  user: { type: String, required: true },
  project: { type: String, required: true },
  endpoint: { type: String, required: true }
});
repoSchema.plugin(timestamps);

var Repo = mongoose.model('Repo', repoSchema);

var runLogSchema = new Schema({
  user: { type: String, required: true },
  project: { type: String, required: true },
  instanceId: { type: String, required: true },
  started: { type: Date, default: Date.now },
  startCommit: { type: String, required: true },
  completed: { type: Date },
  completeCommit: { type: String },
  ami: { type: String, required: true }
});
runLogSchema.plugin(timestamps);

var RunLog = mongoose.model('RunLog', runLogSchema);

module.exports.Repo = Repo;
module.exports.RunLog = RunLog;
