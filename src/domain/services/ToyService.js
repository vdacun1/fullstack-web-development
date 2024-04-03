const ToyRepository = require('../repositories/ToyRepository');

const ToyService = {
  list: async () => {
    const toyRepository = ToyRepository();
    return toyRepository.find();
  },
};

module.exports = ToyService;
