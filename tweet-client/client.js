const http = require('http');
const qs = require('querystring');

const search = process.argv.slice(2).join('').trim();

if (!search.length) {
  return console.log('\n Usage: node tweets <search term>\n');
}

console.log('\n searching for: ' + search + '\n');

http.request({
  host: 'search.tweet.com',
  url: '/search.json?' + qs.stringify({ q: search }),
}, (res) => {
  let body = '';
  
  res.setEncoding('utf8');
  
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    let obj = JSON.parse(body);
    
    obj.results.forEach((tweet) => {
      console.log(tweet.text);
      console.log(tweet.from_user);
      console.log('--');
    });
  });
}).end();

