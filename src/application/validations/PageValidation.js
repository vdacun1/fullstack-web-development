const { param } = require('express-validator');

const PageValidation = {
  page: () => param('page').isInt({ min: 1 }),
  limit: () => param('limit').isInt({ min: 1 }),
};

module.exports = PageValidation;
