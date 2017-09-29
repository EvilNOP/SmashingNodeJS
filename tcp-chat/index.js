const net = require('net');

const server = net.createServer((conn) => {
  console.log('new connection!');
});

server.listen(3000, () => {
  console.log('server listening on *:3000');
});
