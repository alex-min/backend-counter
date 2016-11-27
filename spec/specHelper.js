process.env.NODE_ENV = 'test';

let glob = require('glob');
let files = glob.sync(`${__dirname}/support/**/*.js`);
files.forEach((file) => require(file));
