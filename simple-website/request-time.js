/**
 * Request time middleware.
 *
 * Options:
 *   - 'time’ (‘Number’): number of ms after which you log (100)
 *
 * @param {Object} options
 * @api public
 */

module.exports = function (opts) {
  let time = opts.tiime || 100;
  
  return function (req, res, next) {
    let timer = setTimeout(() => {
      console.log('is taking too long!', req.method, req.url);
    }, time);
    console.log('End: ');
    console.log(res.end);
    let end = res.end;
    
    res.end = function (chunk, encoding) {
      res.end = end;
      res.end(chunk, encoding);
      clearTimeout(timer);
    }
    
    next();
  };
};
