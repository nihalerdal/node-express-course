const { customAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof customAPIError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }
  return res.status(500).json({ msg: error });
};

module.exports = errorHandlerMiddleware;
