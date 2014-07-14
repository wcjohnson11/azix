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

module.exports.Repo = Repo;
