const { body, matchedData, validationResult } = require("express-validator");

const ErrorResponse = require("../responses/ErrorResponse");

const LoginRequest = {
  validate: () => [
    body("username").isString().isLength({ min: 3, max: 100 }),
    body("password").isString().isLength({ min: 6, max: 20 }),
  ],
  handle: (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);

      console.log(data);

      return res.send(`You are user ${data.username}, welcome!`);
    }

    return ErrorResponse.handleBadRequest(res, "Wrong username or password");
  },
};

module.exports = LoginRequest;
