const express = require('express');

const app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.delete('/project/:id', (req, res, next) => {

});

app.post('/projects', (req, res, next) => {

});

app.get('/project/:id/task', (req, res, next) => {

});

app.post('/project/:id/tasks', (req, res, next) => {

});

app.delete('/task/:id', (req, res, next) => {

});

app.listen(3000, () => {
  console.log(' - listening on http://*:3000');
});
