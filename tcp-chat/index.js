const net = require('net');
let count = 0;
let users = {};

const server = net.createServer((conn) => {
  let nickname;
  
  conn.setEncoding('utf8');
  
  conn.write(
      '\n > welcome to node-chat!'
    + `\n > ${count} other people are connected at this time.`
    + '\n > please write your name and press enter: '
  );
  
  count++;
  
  conn.on('data', (chunk) => {
    chunk = chunk.replace('\r\n', '');
    
    if (!nickname) {
      if (users[chunk]) {
        conn.write('nickname already in use. try again:');
        
        return;
      } else {
        nickname = chunk;
        users[nickname] = conn;
        
        for (let i in users) {
          users[i].write(`${nickname} joined the room\n`);
        }
      }
    } else {
      for (let i in users) {
        if (i != nickname) {
          users[i].write(` > ${nickname}: ${chunk}\n`);
        }
      }
    }
  });
  
  conn.on('close', () => {
    count--;
  });
});

server.listen(3000, () => {
  console.log('server listening on *:3000');
});
