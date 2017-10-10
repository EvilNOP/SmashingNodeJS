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
  
  const users = db.collection('users');

  app.users = users;
  
  users.createIndex({ email: 1, password: 1 }, (err, indexName) => {
    if (err) {
      throw err;
    }

    console.log(`created index: ${indexName}`);
  });
  
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

app.use((req, res, next) => {
  if (req.session.loggedIn) {
    res.locals.authenticated = true;
    res.app.users.findOne({ _id: mongodb.ObjectID(req.session.loggedIn) }, (err, doc) => {
      if (err) {
        return next(err);
      }

      res.locals.me = doc;
      
      next();
    });
  } else {
    res.locals.authenticated = false;

    next();
  }
});

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res, next) => {
  app.users.findOne({ email: req.body.user.email, password: req.body.user.password }, (err, doc) => {
    if (err) {
      return next(err);
    }
    
    if (!doc) {
      return res.send('<p>User not found.Go back and try again</p>');
    }

    req.session.loggedIn = doc._id.toString();
    res.redirect('/');
  });
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

app.get('/logout', (req, res) => {
  req.session.loggedIn = null;
  res.redirect('/');
});
