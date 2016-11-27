let status = require('./endpoints/status');
let increment = require('./endpoints/increment');

module.exports = (req, res) => {
  switch (req.url) {
    case '/get': return increment(req, res, sendResponse.bind(this, res));
    case '/status': return status(req, res, sendResponse.bind(this, res));
    default: return notFound(req, res);
  }
}

function notFound(request, response) {
  response.writeHead(404, {"Content-Type": "application/json" });
  response.end(`{"result": "unknown endpoint"}`);
}

function sendResponse(response, error, result) {
  let httpCode = 200;
  if (error) {
    httpCode = 500;
    console.error(error);
  }
  response.writeHead(httpCode, {"Content-Type": "application/json" });
  response.end(`{"result":${result}}`);
}

process.on('uncaughtException', (error) => {
  console.error('Unknown error happened')
  console.error(error);
});
