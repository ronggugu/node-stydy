
const http = require('http');

const PORT = 3000;
const ServerHandle = require('../app');

const server = http.createServer(ServerHandle);
server.listen(PORT);