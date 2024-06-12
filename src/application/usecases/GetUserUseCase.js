const UserService = require('../../domain/services/UserService');
const HttpStatus = require('../constants/HttpStatus');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/Logger');

const GetUserUseCase = {
  handle: async (res, data) => {
    try {
      const { user: id } = data;

      const user = await UserService.getUser(id);

      return res.status(HttpStatus.OK).send(user);
    } catch (error) {
      log.error(error);
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.SERVER_ERROR,
        message: 'Error while getting user toys',
      });
    }
  },
};

module.exports = GetUserUseCase;
