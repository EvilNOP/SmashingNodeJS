const express = require('express');
const mongodb = require('mongodb');

const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  resave: true,
  saveUninitialized: true
}));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index', { authenticated: false });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.listen(3000);
