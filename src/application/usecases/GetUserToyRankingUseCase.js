const UserToyService = require('../../domain/services/UserToyService');
const HttpStatus = require('../constants/HttpStatus');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/Logger');

const GetUserToyRankingUseCase = {
  handle: async (req, res) => {
    try {
      const userToyRanking = await UserToyService.ranking();

      return res.status(HttpStatus.OK).send(userToyRanking);
    } catch (error) {
      log.error(error);
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.SERVER_ERROR,
        message: 'Error while getting user toy ranking',
      });
    }
  },
};

module.exports = GetUserToyRankingUseCase;
