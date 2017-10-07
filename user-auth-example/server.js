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

app.set('view engine', 'jade');
app.set('view options', { layout: false });
