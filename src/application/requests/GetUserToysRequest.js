const { matchedData, validationResult } = require('express-validator');
const UserToyValidation = require('../validations/UserToyValidation');
const PageValidation = require('../validations/PageValidation');
const ErrorResponse = require('../responses/ErrorResponse');
const GetUserToysUseCase = require('../usecases/GetUserToysUseCase');

const GetUserToysRequest = {
  validate: () => [UserToyValidation.user(), PageValidation.page(), PageValidation.limit()],
  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await GetUserToysUseCase.handle(res, matchedData(req));
    }

    return ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = GetUserToysRequest;
