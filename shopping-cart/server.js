const mysql = require('mysql');
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');

const app = express();
const db = mysql.createConnection(config);

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.render('index', { items: [] });
});

app.post('/create', (req, res, next) => {

});

app.get('/item/:id', (req, res, next) => {
  res.render('item');
});

app.post('/item/:id/reivew', (req, res, next) => {

});

app.listen(3000, () => {
  console.log(' - listening on http://*:3000');
});
