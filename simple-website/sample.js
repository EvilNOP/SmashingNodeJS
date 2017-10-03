const morgan = require('morgan');
const connect = require('connect');
const time = require('./request-time');

const app = connect();

app.use(morgan('dev'));
app.use(time({ time: 500 }));

app.use((req, res, next) => {
  if (req === '/a') {
    res.statusCode = 200;
    res.end('Fast!');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.url === '/b') {
    setTimeout(() => {
      res.statusCode = 200;
      res.end('Slow!');
    }, 1000);
  } else {
    next();
  }
});

app.listen(3000);
