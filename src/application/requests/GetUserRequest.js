const { matchedData, validationResult } = require('express-validator');

const GetUserUseCase = require('../usecases/GetUserUseCase');
const ErrorResponse = require('../responses/ErrorResponse');
const UserValidation = require('../validations/UserValidation');

const GetUserRequest = {
  validate: () => [
    UserValidation.user(),
  ],
  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await GetUserUseCase.handle(res, matchedData(req));
    }

    return ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = GetUserRequest;
