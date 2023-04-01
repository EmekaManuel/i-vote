module.exports.errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.message || "something went wrong",
  });
};

module.exports.notFound = (req,res,next) => {
    const error = new Error ('not found')
     error.status = 404;
     next(error)
}