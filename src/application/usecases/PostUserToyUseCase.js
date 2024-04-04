const UserToyService = require('../../domain/services/UserToyService');
const HttpStatus = require('../constants/HttpStatus');
const ErrorType = require('../../domain/constants/ErrorType');
const ErrorResponse = require('../responses/ErrorResponse');

const PostUserToyUseCase = {
  handle: async (res, data) => {
    try {
      const { user, toy, color, accessory } = data;

      const userToy = await UserToyService.create({
        user,
        toyName: toy,
        colorName: color,
        accessoryName: accessory,
      });

      return res.status(HttpStatus.OK).send(userToy);
    } catch (error) {
      if (error.error === ErrorType.EntityNotFound) {
        return ErrorResponse.handleApiException(res, {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
          errors: error.errors,
        });
      }

      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.SERVER_ERROR,
        message: 'Error while creating user toy',
      });
    }
  },
};

module.exports = PostUserToyUseCase;
