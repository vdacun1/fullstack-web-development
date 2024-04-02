const mongoose = require('mongoose');
const ToySchema = require('../models/ToySchema');

const ToyRepository = () => {
  return mongoose.model('Toy', ToySchema);
};

module.exports = ToyRepository;
