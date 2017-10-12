const redis = require('redis');

function User(id, data) {
  this.id = id;
  this.data = data;
}

User.prototype.find = function (id, fn) {
  client.hgetall('user:' + id + ':data', (err, obj) => {
    if (err) {
      return fn(err);
    }

    fn(null, new User(id, obj));
  });
};

User.prototype.save = function (fn) {
  if (!this.id) {
    this.id = String(Math.random()).substr(3);
  }

  client.hmset('user:' + this.id + ':data', this.data, fn);
};

const client = redis.createClient();

client.set('my key', 'my value', err => {

});
