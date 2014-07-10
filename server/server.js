var express = require('express');
var app = express();


app.post('/api/init', function(req, res) {
  res.send({ json: 'data' });
});


app.listen(process.env.PORT || 8000);
