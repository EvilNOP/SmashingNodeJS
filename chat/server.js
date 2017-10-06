const sio = require('socket.io');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);
const io = sio(server);

app.use(bodyParser.json());
app.use(express.static('public'));

server.listen(3000);

io.sockets.on('connection', (socket) => {
  console.log('Someone connected');
  
  socket.on('join', (name) => {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.');
  });
  
  socket.on('text', (msg) => {
    socket.broadcast.emit('text', socket.nickname, msg);
  });
});
