var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.post('/api/init', function(req, res) {
  res.send({});
});


app.listen(process.env.PORT || 8000);
