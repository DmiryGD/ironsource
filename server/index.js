const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 8080;
const host = '0.0.0.0';

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

