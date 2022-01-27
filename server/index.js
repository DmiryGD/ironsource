const http = require('http');
const fs = require('fs');
const url = require('url');
const redis = require('redis');

const port = 8080;
const host = '0.0.0.0';
const redis_cluster = 'cluster.8k6cep.0001.usw2.cache.amazonaws.com';

const redisconn = redis.createClient({
    host: redis_cluster,
    port: 6379
});
redisconn.select(0);

const server = http.createServer((req, res) => {
  var urlParts = url.parse(req.url);
  var reqPath = urlParts.pathname;
  res.statusCode = 200;
  console.log(req.url);
  if (reqPath == '/api') {
      const msg = 'API references.\n'
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

