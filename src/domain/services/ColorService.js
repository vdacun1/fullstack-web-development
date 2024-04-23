const ColorRepository = require('../repositories/ColorRepository');

const ColorService = {
  list: async () => {
    const colorRepository = ColorRepository();
    return colorRepository.find();
  },
};

module.exports = ColorService;
