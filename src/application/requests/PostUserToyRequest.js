const { matchedData, validationResult } = require('express-validator');

const PostUserToyUseCase = require('../usecases/PostUserToyUseCase');
const ErrorResponse = require('../responses/ErrorResponse');
const UserToyValidation = require('../validations/UserToyValidation');

const PostUserToyRequest = {
  validate: () => [
    UserToyValidation.user(),
    UserToyValidation.toy(),
    UserToyValidation.color(),
    UserToyValidation.accessory(),
  ],
  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await PostUserToyUseCase.handle(res, matchedData(req));
    }

    return ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = PostUserToyRequest;
