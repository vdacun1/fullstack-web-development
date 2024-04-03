const ErrorType = require('../constants/ErrorType');
const UserToyRepository = require('../repositories/UserToyRepository');
const UserRepository = require('../repositories/UserRepository');
const ToyRepository = require('../repositories/ToyRepository');
const ColorRepository = require('../repositories/ColorRepository');
const AccessoryRepository = require('../repositories/AccessoryRepository');

const UserToyService = {
  list: (userId) => {
    const userToyRepository = UserToyRepository();
    return userToyRepository.find({ user: userId });
  },

  create: async ({ user, toy, color, accessory }) => {
    await checkIfEntityExists({ user, toy, color, accessory });
    const userToyRepository = UserToyRepository();
    return await userToyRepository.create({ user, toy, color, accessory });
  },
};

const checkIfEntityExists = async ({ user, toy, color, accessory }) => {
  const repositories = [
    { repo: UserRepository(), id: user, name: 'User' },
    { repo: ToyRepository(), id: toy, name: 'Toy' },
    { repo: ColorRepository(), id: color, name: 'Color' },
    { repo: AccessoryRepository(), id: accessory, name: 'Accessory' },
  ];

  const results = await Promise.all(
    repositories.map(({ repo, id }) => repo.findById(id)),
  );

  const errors = repositories
    .filter((_, index) => !results[index])
    .reduce((acc, { id, name }) => {
      acc[name] = `${id} not found`;
      return acc;
    }, {});

  if (Object.keys(errors).length > 0) {
    throw {
      error: ErrorType.EntityNotFound,
      message: 'Some entities were not found',
      errors,
    };
  }
};

module.exports = UserToyService;
