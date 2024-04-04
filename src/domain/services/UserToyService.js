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

  create: async ({ user, toyName, colorName, accessoryName }) => {
    const [toy, color, accessory] = await getEntities({
      toyName,
      colorName,
      accessoryName,
    });
    const userToyRepository = UserToyRepository();
    return await userToyRepository.create({ user, toy, color, accessory });
  },
};

const getEntities = async ({ toyName, colorName, accessoryName }) => {
  const repositories = [
    {
      repository: ToyRepository(),
      name: toyName,
      model: 'toy',
    },
    {
      repository: ColorRepository(),
      name: colorName,
      model: 'color',
    },
    {
      repository: AccessoryRepository(),
      name: accessoryName,
      model: 'accessory',
    },
  ];

  const results = await Promise.all(
    repositories.map(({ repository, name }) => repository.findOne({ name })),
  );

  const errors = repositories
    .filter((_, index) => !results[index])
    .reduce((acc, { name, model }) => {
      acc[model] = `${name} not found`;
      return acc;
    }, {});

  if (Object.keys(errors).length > 0) {
    throw {
      error: ErrorType.EntityNotFound,
      message: 'Some entities were not found',
      errors,
    };
  }
  return results.map(({ _id }) => _id);
};

module.exports = UserToyService;
