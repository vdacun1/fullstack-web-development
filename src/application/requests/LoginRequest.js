const { matchedData, validationResult } = require("express-validator");

const ErrorResponse = require("../responses/ErrorResponse");
const UserValidation = require("../validations/UserValidation");
const LoginUseCase = require("../usecases/LoginUseCase");

const LoginRequest = {
  validate: () => [UserValidation.email(), UserValidation.password()],

  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await LoginUseCase.handle(res, matchedData(req));
    }

    return await ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = LoginRequest;
