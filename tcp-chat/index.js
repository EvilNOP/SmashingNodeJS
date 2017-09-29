const net = require('net');
let count = 0;

const server = net.createServer((conn) => {
  conn.setEncoding('utf8');
  
  conn.write(
      '\n > welcome to node-chat!'
    + `\n > ${count} other people are connected at this time.`
    + '\n > please write your name and press enter: '
  );
  
  count++;
  
  conn.on('data', (chunk) => {
    console.log(chunk);
  });
  
  conn.on('close', () => {
    count--;
  });
});

server.listen(3000, () => {
  console.log('server listening on *:3000');
});
