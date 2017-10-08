const express = require('express');
const mongodb = require('mongodb');

const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const mongoClient = mongodb.MongoClient;
const dburl = 'mongodb://localhost:27017/user-auth-example';

mongoClient.connect(dburl, (err, db) => {
  if (err) {
    throw err;
  }
  
  console.log("Connected successfully to server");
  
  app.users = db.collection('users');
  
  app.listen(3000, () => {
    console.log('app listening on *:3000');
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/signup', (req, res, next) => {
  app.users.insertOne(req.body.user, (err, result) => {
    if (err) {
      return next(err);
    }
    
    res.redirect('/login/' + result.ops[0].email);
  });
});

app.get('/login/:signupEmail', (req, res) => {
  res.render('login', { signupEmail: req.params.signupEmail });
});
