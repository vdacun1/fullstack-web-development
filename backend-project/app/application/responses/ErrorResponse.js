const ErrorResponse = {
  handleBadRequest: (res, errors) => {
    return res.status(400).send({ errors });
  },
  handleValidation: (resultArray) => {
    let result = {};

    resultArray.forEach((error) => {
      result[error.path] = error.msg;
    });

    return result;
  },
};

module.exports = ErrorResponse;
