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
  db.query('SELECT id, title, description FROM item', (err, results) => {
    res.render('index', { items: results });
  });
});

app.post('/create', (req, res, next) => {
  db.query(
    'INSERT INTO item SET title = ?, description = ?, created = ?',
    [req.body.title, req.body.description, new Date()], (err, info) => {
      if (err) {
        return next(err);
      }

      console.log(`created with id ${info.insertId}`);

      res.redirect('/');
    }
  );
});

app.get('/item/:id', (req, res, next) => {
  function getItem(fn) {
    db.query('SELECT id, title, description FROM item WHERE id = ? LIMIT 1',
      [req.params.id], (err, results) => {
        if (err) {
          return next(err);
        }

        if (!results[0]) {
          return res.sendStatus(404);
        }

        fn(results[0]);
      }
    );
  }

  function getReviews(item_id, fn) {
    db.query('SELECT text, stars FROM review WHERE item_id = ?',
      [item_id], (err, results) => {
        if (err) {
          return next(err);
        }

        fn(results);
      }
    );
  }

  getItem((item) => {
    getReviews(item.id, (reivews) => {
      res.render('item', { item: item, reviews: reivews });
    });
  });
});

app.post('/item/:id/review', (req, res, next) => {
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
