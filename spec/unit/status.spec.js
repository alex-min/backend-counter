let status = require('../../src/endpoints/status');

describe('status endpoint', () => {
  it('returns zero when the counter is unset', (cb) => {
    redis.del('backend_counter', () => {
      status(null, null, (error, result) => {
        expect(result).to.eql('0');
        expect(error).to.eql(null);
        cb();
      });
    });
  });

  it('returns the counter when it exists', (cb) => {
    redis.set('backend_counter', '3', () => {
      status(null, null, (error, result) => {
        expect(result).to.eql('3');
        expect(error).to.eql(null);
        cb();
      });
    });
  });
});
