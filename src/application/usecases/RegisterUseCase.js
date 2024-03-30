const UserService = require("../../domain/services/UserService");
const ErrorResponse = require("../responses/ErrorResponse");
const { log } = require("../../infrastructure/Logger");
const HttpStatus = require("../constants/HttpStatus");

const RegisterUseCase = {
  handle: async (res, data) => {
    try {
      const { email, password } = data;

      const user = await UserService.register({ email, password });
      const message = `User registered successfully: ${user.email}`;

      log.info(message);
      return res.status(HttpStatus.CREATED).send({
        status: HttpStatus.CREATED,
        message,
      });
    } catch (error) {
      log.error(error);

      if (error.code === 11000) {
        ErrorResponse.handleApiException(res, {
          status: HttpStatus.CONFLICT,
          message: "User already exists",
        });
      } else {
        ErrorResponse.handleApiException(res, {
          status: HttpStatus.SERVER_ERROR,
          message: "Error while registering user",
        });
      }
    }
  },
};

module.exports = RegisterUseCase;
