const HttpStatus = require('../constants/HttpStatus');
const UserService = require('../../domain/services/UserService');
const CryptService = require('../../domain/services/CryptService');
const JWTService = require('../../domain/services/JWTService');
const ErrorResponse = require('../responses/ErrorResponse');
const { log } = require('../../infrastructure/Logger');

const LoginUseCase = {
  handle: async (res, data) => {
    try {
      const { email, password } = data;

      const {
        _id: user,
        password: hashedPassword,
        email_verified,
      } = await UserService.getUserByEmail(email);

      await CryptService.compare(password, hashedPassword);

      if (!email_verified) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Email not verified',
        });
      }

      const token = JWTService.sign({ user });

      log.info(`User logged in: ${email}`);
      return res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Login success',
        token,
      });
    } catch (error) {
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Wrong email or password',
      });
    }
  },
};

module.exports = LoginUseCase;
