const UserService = require("../../domain/services/UserService");
const ErrorResponse = require("../responses/ErrorResponse");

const RegisterUseCase = {
  handle: async (res, data) => {
    const { email, password } = data;

    UserService.register({ email, password })
      .then((user) => {
        return res.status(201).send(user);
      })
      .catch((error) => {
        return ErrorResponse.handleException(res, error);
      });
  },
};

module.exports = RegisterUseCase;
