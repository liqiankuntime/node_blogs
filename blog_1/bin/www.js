
const http = require('http');

const serverCallback = require('../app');

const server = http.createServer(serverCallback);

server.listen(8000);