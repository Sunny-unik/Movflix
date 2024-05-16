const errorHandler = ({ message, stack }, _, res, _next) => {
  console.error(stack);
  res
    .status(500)
    .json({ message: message ? message : "Internal Server Error" });
};

module.exports = errorHandler;
