let redis = require('redis');

let redis_url = process.env['REDIS_URL'] || 'redis://redis:6379';
let client;

try {
  client = redis.createClient({url: redis_url});
} catch (error) {
  console.error(`Cannot connect to redis with url ${redis_url}`);
  throw error;
}

module.exports = client;
