const ToyService = require('../../domain/services/ToyService');
const HttpStatus = require('../constants/HttpStatus');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/Logger');

const GetToysUseCase = {
  handle: async (res) => {
    try {
      const toys = await ToyService.list();
      return res.status(HttpStatus.OK).send(toys);
    } catch (error) {
      log.error(error);
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.SERVER_ERROR,
        message: 'Error while getting toys',
      });
    }
  },
};

module.exports = GetToysUseCase;
