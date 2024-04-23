const { header, body } = require('express-validator');
const UserValidation = require('./UserValidation');

const UserToyValidation = {
  user: () => UserValidation.user(),
  toy: () => body('toy').isString().trim().escape(),
  color: () => body('color').isString().trim().escape(),
  accessory: () => body('accessory').isString().trim().escape(),
};

module.exports = UserToyValidation;
