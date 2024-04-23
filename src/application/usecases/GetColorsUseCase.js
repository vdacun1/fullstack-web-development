const ColorService = require('../../domain/services/ColorService');
const HttpStatus = require('../constants/HttpStatus');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/Logger');

const GetColorsUseCase = {
  handle: async (req, res) => {
    try {
      const colors = await ColorService.list();
      return res.status(HttpStatus.OK).send(colors);
    } catch (error) {
      log.error(error);
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.SERVER_ERROR,
        message: 'Error while getting colors',
      });
    }
  },
};

module.exports = GetColorsUseCase;
