const { matchedData, validationResult } = require('express-validator');

const RegisterUseCase = require('../usecases/RegisterUseCase');
const ErrorResponse = require('../responses/ErrorResponse');
const UserValidation = require('../validations/UserValidation');

const RegisterRequest = {
  validate: () => [UserValidation.email(), UserValidation.password()],

  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await RegisterUseCase.handle(res, matchedData(req));
    }

    return await ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = RegisterRequest;
