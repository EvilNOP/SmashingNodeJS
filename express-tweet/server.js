/**
* Module requirements.
*/

const express = require('express');
const search = require('./search');

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

app.get('/search', (req, res, next) => {
  search(req.query.q, (err, tweets) => {
    if (err) {
      return next(err);
    }
    
    res.render('search', { results: tweets, search: req.query.q })
  });
});

/**
* Listen.
*/

app.listen(3000);
