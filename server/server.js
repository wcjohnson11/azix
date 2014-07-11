var lib = require('./index.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());

app.post('/api/init', lib.initHandler);


app.listen(process.env.PORT || 8000);

console.log('listening on port ', process.env.PORT || 8000);
