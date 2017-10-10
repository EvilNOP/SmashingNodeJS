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
  db.query(
    'INSERT INTO item SET title = ?, description = ?',
    [req.body.title, req.body.description], (err, info) => {
      if (err) {
        return next(err);
      }

      console.log(`created with id ${info.insertId}`);

      res.redirect('/');
    }
  );
});

app.get('/item/:id', (req, res, next) => {
  res.render('item');
});

app.post('/item/:id/reivew', (req, res, next) => {
  db.query('INSERT INTO review SET item_id = ?, stars = ?, text = ?',
    [req.params.id, req.body.stars, req.body.text], (err, info) => {
      if (err) {
        return next(err);
      }
      
      console.log(`review created with id ${info.insertId}`);

      res.redirect(`/item/${req.params.id}`);
    }
  );
});

app.listen(3000, () => {
  console.log(' - listening on http://*:3000');
});
