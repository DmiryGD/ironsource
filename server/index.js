const http = require('http');
const fs = require('fs');
const url = require('url');
const redis = require('redis');

const port = 8080;
const host = '0.0.0.0';
const redis_cluster = 'cluster.8k6cep.0001.usw2.cache.amazonaws.com';

var redisconn = redis.createClient({
  port: 6379,
  host: redis_cluster
});

redisconn.select(0);
get_requests_count_from_redis();

var requests_count = 0;

function get_requests_count_from_redis() {
    redisconn.get('nginx_requests', function(error, obj) {
        if (obj) {
            console.log(obj);
            requests_count = obj;
        }
    });
}

function set_requests_count_to_redis(count) {
    redisconn.set('nginx_requests', count, function(error, obj) {});
}

const server = http.createServer((req, res) => {
  var urlParts = url.parse(req.url);
  var reqPath = urlParts.pathname;
  res.statusCode = 200;
  requests_count = requests_count + 1;
  set_requests_count_to_redis(requests_count);
  if (reqPath == '/api') {
      const msg = `Count: ${requests_count}\n`;
      res.setHeader('Content-Type', 'text/plain');
      res.end(msg);
  } else {
    fs.readFile('/app/index.html', 'utf8' , (err, data) => {
      if (err) {
        console.log(err)
        res.setHeader('Content-Type', 'text/plain');
        res.end("404 Not found");
      } else {
        res.end(data);
      }
    })
  }
});

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/`);
});

