const { body, matchedData, validationResult } = require("express-validator");

const RegisterUseCase = require("../usecases/RegisterUseCase");
const ErrorResponse = require("../responses/ErrorResponse");

const RegisterRequest = {
  validate: () => [
    body("email")
      .isEmail()
      .isLength({ min: 5, max: 255 })
      .trim()
      .normalizeEmail()
      .escape(),
    body("password").isString().isLength({ min: 6, max: 20 }),
  ],

  handle: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return await RegisterUseCase.handle(res, matchedData(req));
    }

    return await ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = RegisterRequest;
