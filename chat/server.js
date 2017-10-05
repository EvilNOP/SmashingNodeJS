const sio = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());

app.listen(3000);

const io = sio.listen(app);

io.sockets.on('connection', (socket) => {
  console.log('Someone connected');
});
