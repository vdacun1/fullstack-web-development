const { header, body } = require('express-validator');

const UserToyValidation = {
  user: () => header('user').isMongoId(),
  toy: () => body('toy').isMongoId(),
  color: () => body('color').isMongoId(),
  accessory: () => body('accessory').isMongoId(),
};

module.exports = UserToyValidation;
