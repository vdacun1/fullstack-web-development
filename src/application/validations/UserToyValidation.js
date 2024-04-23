const { body, param } = require('express-validator');
const UserValidation = require('./UserValidation');

const UserToyValidation = {
  user: () => UserValidation.user(),
  toy: () => body('toy').isString().trim().escape(),
  color: () => body('color').isString().trim().escape(),
  accessory: () => body('accessory').isString().trim().escape(),
  userToy: () => param('id').isMongoId(),
};

module.exports = UserToyValidation;
