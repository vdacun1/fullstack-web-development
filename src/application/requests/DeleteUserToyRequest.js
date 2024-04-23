const { matchedData, validationResult } = require('express-validator');
const UserToyValidation = require('../validations/UserToyValidation');

const DeleteUserToyUseCase = require('../usecases/DeleteUserToyUseCase');
const ErrorResponse = require('../responses/ErrorResponse');

const DeleteUserToyRequest = {
  validate: () => [UserToyValidation.user(), UserToyValidation.userToy()],
  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await DeleteUserToyUseCase.handle(res, matchedData(req));
    }

    return ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = DeleteUserToyRequest;
