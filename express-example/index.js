var express = require('express');
var app = express();
 
app.get('/', (req, res) => {
  console.log('GET /');
  res.send('Hello World!');
});

const test = require('./route/testdb')
app.get('/test',test);
 
app.listen(3000, () => {
  console.log('Listening on port 3000');
});