

module.exports = {
  ...require('./auth')
}


module.exports.notFound = (req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
};

module.exports.errors = (error, req, res, next) => {
  res.status(error.status || 400).json({
    error: error.message || "something went wrong",
  });
};

