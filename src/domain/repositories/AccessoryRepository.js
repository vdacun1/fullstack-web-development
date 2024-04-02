const mongoose = require('mongoose');
const AccessorySchema = require('../models/AccessorySchema');

const AccessoryRepository = () => {
  return mongoose.model('Accessory', AccessorySchema);
};

module.exports = AccessoryRepository;
