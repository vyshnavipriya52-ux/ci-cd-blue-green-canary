const http = require('http');

http.createServer((req, res) => {
  res.end("Version 1 🚀");
}).listen(3000);
