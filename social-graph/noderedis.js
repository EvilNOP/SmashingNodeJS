const redis = require('redis');

const client = redis.createClient();

client.set('my key', 'my value', err => {

});
