const wrapAsync = (fn) => (req, res, next) => {
  return fn(req, res, next).catch(next);
};
module.exports = wrapAsync;
