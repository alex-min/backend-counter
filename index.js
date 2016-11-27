let http = require('http');
let route_requests = require('./src/routes');

console.log('Stating backend counter api');
http.createServer(route_requests).listen(80);
