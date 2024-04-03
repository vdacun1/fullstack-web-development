const { matchedData, validationResult } = require('express-validator');
const AuthValidation = require('../validations/AuthValidation');
const UserToyValidation = require('../validations/UserToyValidation');
const ErrorResponse = require('../responses/ErrorResponse');
const GetUserToysUseCase = require('../usecases/GetUserToysUseCase');

const GetUserToysRequest = {
  validate: () => [UserToyValidation.user()],
  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await GetUserToysUseCase.handle(res, matchedData(req));
    }

    return ErrorResponse.handleApiException(res, result.array());
  },
};

module.exports = GetUserToysRequest;
