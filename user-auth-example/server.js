const express = require('express');
const mongodb = require('mongodb');

const cookieParser = require('cookie');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'my secret' }));

app.set('view engine', 'jade');
app.set('view options', { layout: false });

