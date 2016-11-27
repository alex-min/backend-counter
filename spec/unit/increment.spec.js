let increment = require('../../src/endpoints/increment');
let status = require('../../src/endpoints/status');

describe('increment endpoint', () => {
  it('sets the counter to one when it does not exist', (endTest) => {
    deleteCounter(() => {
      increment(null, null, (error, result) => {
        expect(result).to.eql('ok');
        expect(error).to.eql(null);
        status(null, null, (error, result) => {
          expect(result).to.eql('1');
          endTest();
        })
      });
    });
  });

  it('increments the counter until ten', (endTest) => {
     function incrementCounter(n, cb) {
      increment(null, null, cb);
     }
     deleteCounter(() => {
       async.times(10, incrementCounter, function (err, results) {
         status(null, null, (error, result) => {
           expect(result).to.eql('10');
           expect(error).to.eql(null);
           endTest();
         })
       });
     });
  })
});
