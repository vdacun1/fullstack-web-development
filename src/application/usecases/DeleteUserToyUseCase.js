const UserToyService = require('../../domain/services/UserToyService');
const ErrorType = require('../../domain/constants/ErrorType');
const HttpStatus = require('../constants/HttpStatus');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/Logger');

const DeleteUserToyUseCase = {
  handle: async (res, data) => {
    try {
      const { user, id } = data;

      const result = await UserToyService.delete(user, id);
      if (result.message === 'User toy deleted') {
        return res.status(HttpStatus.NO_CONTENT).send();
      } else {
        return res.status(HttpStatus.OK).send(result);
      }
    } catch (error) {
      log.error(error);
      if (error.type === ErrorType.EntityNotFound) {
        return ErrorResponse.handleApiException(res, {
          status: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }

      return res.status(HttpStatus.SERVER_ERROR).send();
    }
  },
};

module.exports = DeleteUserToyUseCase;
