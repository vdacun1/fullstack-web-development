const ErrorResponse = require('../../application/responses/ErrorResponse');
const HttpStatus = require('../../application/constants/HttpStatus');
const CacheService = require('../../domain/services/CacheService');
const UserService = require('../../domain/services/UserService');
const { log } = require('../../infrastructure/Logger');

const ConfirmEmailUseCase = {
  handle: async (req, res) => {
    try {
      const { email_verification_code } = req.params;

      const userId = await CacheService.groupGet(
        CacheService.keys.EMAIL_VERIFICATION,
        email_verification_code,
      );
      if (!userId) {
        return ErrorResponse.handleApiException(res, {
          status: HttpStatus.NOT_FOUND,
          message: 'Invalid email verification code',
        });
      }

      const { email_verification_code: userEmailVerificationCode } =
        await UserService.getEmailVerificationCodeByUserId(userId);
      if (email_verification_code !== userEmailVerificationCode) {
        return ErrorResponse.handleApiException(res, {
          status: HttpStatus.NOT_FOUND,
          message: 'Verification code is expired',
        });
      }

      await UserService.verifyEmail(userId);
      await CacheService.groupDel(
        CacheService.keys.EMAIL_VERIFICATION,
        email_verification_code,
      );

      return res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Email verified successfully',
      });
    } catch (error) {
      log.error(error);
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.SERVER_ERROR,
        message: 'Error while confirming email',
      });
    }
  },
};

module.exports = ConfirmEmailUseCase;
