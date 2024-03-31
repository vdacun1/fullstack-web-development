const { log } = require("../../infrastructure/Logger");

const ErrorResponse = {
  handleValidation: (res, resultArray) => {
    let result = {};

    resultArray.forEach((error) => {
      result[error.path] = error.msg;
    });

    log.error(JSON.stringify({ message: "Validation error", errors: result }));
    return res
      .status(400)
      .send({ status: 400, message: "Validation error", errors: result });
  },
  handleApiException: (res, apiError) => {
    return res
      .status(apiError.status)
      .send({ status: apiError.status, message: apiError.message });
  },
};

module.exports = ErrorResponse;
