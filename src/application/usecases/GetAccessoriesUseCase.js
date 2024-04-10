const AccessoryService = require('../../domain/services/AccessoryService');
const HttpStatus = require('../constants/HttpStatus');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/Logger');

const GetAccessoriesUseCase = {
  handle: async (req, res) => {
    try {
      const accessories = await AccessoryService.list();
      return res.status(HttpStatus.OK).send(accessories);
    } catch (error) {
      log.error(error);
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.SERVER_ERROR,
        message: 'Error while getting accessories',
      });
    }
  },
};

module.exports = GetAccessoriesUseCase;
