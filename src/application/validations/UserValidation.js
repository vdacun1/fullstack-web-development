const { header, body } = require('express-validator');

const UserValidation = {
  user: () => header('user').isMongoId(),
  email: () =>
    body('email')
      .isEmail()
      .isLength({ min: 5, max: 255 })
      .trim()
      .normalizeEmail()
      .escape(),
  password: () => body('password').isString().isLength({ min: 6, max: 20 }),
};

module.exports = UserValidation;
