let Scripto = require('redis-scripto');
let redis = require('../../config/redis');

let redisScript = new Scripto(redis);
redisScript.loadFromDir(`${__dirname}/redis_procedures`);

module.exports = (request, response, cb) => {
  redisScript.run('increment_counter', [], [], function (error) {
    if (error) {
      cb(error, '"unknown error occured"')
    } else {
      cb(null, '"ok"')
    }
  })
}
