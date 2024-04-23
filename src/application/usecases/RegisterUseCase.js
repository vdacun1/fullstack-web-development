const uuid = require('uuid');

const UserService = require('../../domain/services/UserService');
const CryptService = require('../../domain/services/CryptService');
const ErrorResponse = require('../responses/ErrorResponse');
const HttpStatus = require('../constants/HttpStatus');
const CacheService = require('../../domain/services/CacheService');
const MailService = require('../../domain/services/MailService');
const Config = require('../../infrastructure/Config');
const { log } = require('../../infrastructure/Logger');

const RegisterUseCase = {
  handle: async (res, data) => {
    try {
      const { email, password } = data;
      const hashedPassword = await CryptService.hash(password);

      let email_verified = false;
      let email_verification_code = uuid.v4();
      if (!Config.verify_email) {
        email_verified = true;
        email_verification_code = '';
      }

      const user = await UserService.register({
        email,
        password: hashedPassword,
        email_verified,
        email_verification_code,
      });

      if (Config.verify_email) {
        await CacheService.groupSet(
          CacheService.keys.EMAIL_VERIFICATION,
          email_verification_code,
          user['_id'].toString(),
        );
        await MailService.sendConfirmationEmail(email, email_verification_code);
      }

      const message = `User registered successfully: ${email}`;
      log.info(message);
      return res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message,
      });
    } catch (error) {
      log.error(error);

      if (error.code === 11000) {
        return ErrorResponse.handleApiException(res, {
          status: HttpStatus.CONFLICT,
          message: 'User already exists',
        });
      } else {
        return ErrorResponse.handleApiException(res, {
          status: HttpStatus.SERVER_ERROR,
          message: 'Error while registering user',
        });
      }
    }
  },
};

module.exports = RegisterUseCase;
