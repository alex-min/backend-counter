global.deleteCounter = (cb) => {
  redis.multi()
       .del('backend_counter')
       .del('backend_counter_flip')
       .exec(cb);
}

global.setCounterTo = (number, cb) => {
  redis.multi()
       .set('backend_counter', number)
       .del('backend_counter_flip')
       .exec(cb);
}
