const AccessoryRepository = require('../repositories/AccessoryRepository');

const AccessoryService = {
  list: async () => {
    const accessoryRepository = AccessoryRepository();
    return accessoryRepository.find();
  },
};

module.exports = AccessoryService;
