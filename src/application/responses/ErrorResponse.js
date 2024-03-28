const { log } = require("../../infrastructure/Logger");

const ErrorResponse = {
  handleValidation: (res, resultArray) => {
    let result = {};

    resultArray.forEach((error) => {
      result[error.path] = error.msg;
    });

    return res
      .status(400)
      .send({ status: 400, message: "Validation error", errors: result });
  },
  handleException: (res, error) => {
    log.exception(error);
    return res
      .status(error.status)
      .send({ status: error.status, message: error.message });
  },
};

module.exports = ErrorResponse;
