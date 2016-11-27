let increment = require('../../src/endpoints/increment');
let status = require('../../src/endpoints/status');

describe('increment endpoint', () => {
  it('sets the counter to one when it does not exist', (endTest) => {
    deleteCounter(() => {
      increment(null, null, (error, result) => {
        expect(result).to.eql('"ok"');
        expect(error).to.eql(null);
        status(null, null, (error, result) => {
          expect(result).to.eql('1');
          endTest();
        })
      });
    });
  });

  function incrementCounter(n, cb) {
    increment(null, null, cb);
  }

  function incrementsCounterUntil(times, cb) {
    deleteCounter(() => {
      async.times(times, incrementCounter, function (err, results) {
        status(null, null, cb);
      });
    });
  }


  it('increments the counter until ten', (endTest) => {
    incrementsCounterUntil(10, function (error, result) {
      expect(result).to.eql('10');
      expect(error).to.eql(null);
      endTest();
    });
  })

  it('decrements the counter after ten', (endTest) => {
    incrementsCounterUntil(13, function (error, result) {
      expect(result).to.eql('7');
      expect(error).to.eql(null);
      endTest();
    });
  })

  it('re-increment the counter after reaching zero', (endTest) => {
    incrementsCounterUntil(19, function (error, result) {
      expect(result).to.eql('1');
      expect(error).to.eql(null);
      endTest();
    });
  })
});
