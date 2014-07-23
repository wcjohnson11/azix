var config = require('../config.js');
var apiRouter = require('./routes/api.js');
var gitRouter = require('./routes/git.js');
var webRouter = require('./routes/web.js');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();


app.use(logger());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/api', apiRouter);
app.use('/repos', gitRouter);
app.use('/', webRouter);

app.listen(process.env.PORT || config.port);

console.log('listening on port ', process.env.PORT || config.port);
