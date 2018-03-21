const http = require('http');
const router = require('./router');
const server = http.createServer(router);
const port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log(`The server is running on ${port}`);
})