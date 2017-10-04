const express = require('express');
const wsio = require('websocket.io');

let positions = {};
let total = 0;

const app = express();
const ws = wsio.attach(app);

app.use(express.static('public'));

ws.on('connect', (socket) => {
  function boardcast(msg) {
    for (let i = 0; i < ws.clients.length; i++) {
      if (ws.clients[i] && ws.clients[i].id !== socket.id) {
        ws.clients[i].send(msg);
      }
    }
  }
  
  socket.id = ++total;
  socket.send(JSON.stringify(positions));
  
  socket.on('message', (msg) => {
    try {
      var pos = JSON.parse(msg);
    } catch (e) {
      return;
    }
    
    positions[socket.id] = pos;
    
    boardcast(JSON.stringify({ type: 'position', pos: pos, id: socket.id}));
  });
  
  socket.on('close', () => {
    delete positions[socket.id];
    
    boardcast(JSON.stringify({ type: 'disconnect', id: socket.id}));
  });
});

app.listen(3000);
