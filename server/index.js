const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 8080;

const server = http.createServer((req, res) => {
  var urlParts = url.parse(req.url);
  var reqPath = urlParts.pathname;
  res.statusCode = 200;
  if (reqPath !== '/api') {
    fs.readFile('api.txt', 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      res.end(data);
    })
  } else {
    fs.readFile('index.html', 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      res.end(data);
    })
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

