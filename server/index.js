const http = require('http');
const port = 8080;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello World!\n'
  res.end(msg);
});
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

