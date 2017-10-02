/**
* Module requirements.
*/

const express = require('express');
// const search = require('./views/search.ejs');

/**
* Create app.
*/

const app = express();

/**
* Configuration.
*/

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });

/**
* Routes.
*/

app.get('/', (req, res) => {
  res.render('index');
});

/**
* Listen.
*/

app.listen(3000);
