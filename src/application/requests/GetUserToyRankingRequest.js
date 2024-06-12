const { matchedData, validationResult } = require('express-validator');
const PageValidation = require('../validations/PageValidation');
const ErrorResponse = require('../responses/ErrorResponse');
const GetUserToyRankingUseCase = require('../usecases/GetUserToyRankingUseCase');

const GetUserToyRankingRequest = {
  validate: () => [PageValidation.page(), PageValidation.limit()],
  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await GetUserToyRankingUseCase.handle(res, matchedData(req));
    }

    return ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = GetUserToyRankingRequest;
