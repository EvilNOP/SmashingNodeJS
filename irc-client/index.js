const net = require('net');

const client = net.connect(6667, 'irc.freenode.net');

client.setEncoding('utf8');

client.on('connect', () => {
  console.log('connect');
  
  client.write('NICK mynick\r\n');
  client.write('USER mynick 0 * :realname\r\n');
  client.write('JOIN #node.js\r\n');
});
