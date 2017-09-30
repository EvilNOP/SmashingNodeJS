const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html'});
  res.end([
    '<form method="POST" action="/url">',
    '<h1>My form</h1>',
      '<fieldset>',
      '<label>Personal infomation</label>',
      '<p>What is your name?</p>',
      '<input type="text" name="name">',
      '<p><button>Submit</button></p>',
    '</form>'
  ].join(''));
});

server.listen(3000);
