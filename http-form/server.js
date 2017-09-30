const http = require('http');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html'});
  
  if (req.url === '/') {
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
  } else if (req.url === '/url' && req.method === 'POST') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk;
    });
    
    req.on('end', () => {
      res.end('<p>Your name is <b>' + qs.parse(body).name + '</b></p>');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000);
