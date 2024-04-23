const HttpStatus = require('../constants/HttpStatus');
const { log } = require('../../infrastructure/Logger');

const ErrorResponse = {
  handleValidation: (res, resultArray) => {
    let result = {};

    resultArray.forEach((error) => {
      result[error.path] = error.msg;
    });

    log.error(JSON.stringify({ message: 'Validation error', errors: result }));
    return res.status(HttpStatus.BAD_REQUEST).send({
      status: HttpStatus.BAD_REQUEST,
      message: 'Validation error',
      errors: result,
    });
  },
  handleApiException: (res, apiError) => {
    return res.status(apiError.status).send({
      status: apiError.status,
      message: apiError.message,
      errors: apiError.errors || undefined,
    });
  },
  handleAuthException: (res) => {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ status: HttpStatus.UNAUTHORIZED, message: 'Unauthorized' });
  },
};

module.exports = ErrorResponse;
