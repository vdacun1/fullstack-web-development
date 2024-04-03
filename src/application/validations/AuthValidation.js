const JWTService = require('../../domain/services/JWTService');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/logger');

const AuthValidation = {
  authorize: (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const { user } = JWTService.decode(authorization);
      req.headers.user = user;
      next();
    } catch (error) {
      log.error(error);
      return ErrorResponse.handleAuthException(res);
    }
  },
};

module.exports = AuthValidation;
