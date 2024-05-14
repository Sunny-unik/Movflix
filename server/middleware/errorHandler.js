const errorHandler = (err, _, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
