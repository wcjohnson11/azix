var lib = require('./index.js');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();


app.use(logger());
app.use(bodyParser.json());

app.post('/api/init', lib.initHandler);
app.post('/api/run', lib.runHandler);


app.listen(process.env.PORT || 8000);

console.log('listening on port ', process.env.PORT || 8000);
