const UserService = require("../../domain/services/UserService");
const CryptService = require("../../domain/services/CryptService");
const ErrorResponse = require("../responses/ErrorResponse");
const { log } = require("../../infrastructure/Logger");
const HttpStatus = require("../constants/HttpStatus");

const RegisterUseCase = {
  handle: async (res, data) => {
    try {
      const { email, password } = data;
      const hashedPassword = await CryptService.hash(password);

      const user = await UserService.register({
        email,
        password: hashedPassword,
      });

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
          message: "User already exists",
        });
      } else {
        return ErrorResponse.handleApiException(res, {
          status: HttpStatus.SERVER_ERROR,
          message: "Error while registering user",
        });
      }
    }
  },
};

module.exports = RegisterUseCase;
