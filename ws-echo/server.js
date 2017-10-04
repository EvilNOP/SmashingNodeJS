const express = require('express');
const wsio = require('websocket.io');

/**
* Create express app.
*/

const app = express();

/**
* Attach websocket server.
*/

const ws = wsio.attach(app);

/**
* Serve your code
*/

app.use(express.static('public'));

/**
* Listening on connections
*/

ws.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('got: ' + msg);
    
    socket.send('pong');
  });
});

/**
* Listen
*/

app.listen(3000);
