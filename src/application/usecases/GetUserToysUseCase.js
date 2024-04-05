const UserToyService = require('../../domain/services/UserToyService');
const HttpStatus = require('../constants/HttpStatus');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/Logger');

const GetUserToysUseCase = {
  handle: async (res, data) => {
    try {
      const { user } = data;

      const userToys = await UserToyService.list(user);

      return res.status(HttpStatus.OK).send(userToys);
    } catch (error) {
      log.error(error);
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.SERVER_ERROR,
        message: 'Error while getting user toys',
      });
    }
  },
};

module.exports = GetUserToysUseCase;
