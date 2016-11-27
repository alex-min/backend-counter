let redis = require('../../config/redis');

module.exports = (request, response, cb) => {
  redis.get('backend_counter', (error, result) => {
    cb(error, result || '0')
  });;
}
