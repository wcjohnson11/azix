var config = require('../lib/config.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

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




//User Schema
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
var User = mongoose.model('User', UserSchema);


module.exports.Repo = Repo;
module.exports.RunLog = RunLog;
module.exports.User = User;