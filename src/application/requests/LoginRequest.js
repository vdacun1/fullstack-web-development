const { body, validationResult } = require("express-validator");
const ErrorResponse = require("../responses/ErrorResponse");
const { log } = require("../../infrastructure/logger");

const LoginRequest = {
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
      log.info("Login successfully");
      return await res.status(200).send("Login successfully");
    }

    return await ErrorResponse.handleValidation(res, result.array());
  },
};

module.exports = LoginRequest;
