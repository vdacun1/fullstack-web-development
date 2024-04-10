const CacheService = require('./CacheService');

const ErrorType = require('../constants/ErrorType');
const UserToyRepository = require('../repositories/UserToyRepository');
const UserRepository = require('../repositories/UserRepository');
const ToyRepository = require('../repositories/ToyRepository');
const ColorRepository = require('../repositories/ColorRepository');
const AccessoryRepository = require('../repositories/AccessoryRepository');

const UserToyService = {
  list: async (userId) => {
    const userToyRepository = UserToyRepository();
    let userToys;

    userToys = await userToyRepository.getUserLastItemsCreated(userId);
    
    const cacheKey = `user_toy_list_${userId}`;
    const cachedUserToyList = await CacheService.get(cacheKey);

    if (cachedUserToyList) {
      return JSON.parse(cachedUserToyList);
    }

    const userToyList = await Promise.all(
      userToys.map(async ({ toy, color, accessory, quantity }) => {
        const [toyName, colorName, accessoryName] = await getEntitiesById({
          toyId: toy,
          colorId: color,
          accessoryId: accessory,
        });

        return {
          toy: toyName,
          color: colorName,
          accessory: accessoryName,
          quantity,
        };
      }),
    );

    await CacheService.set(cacheKey, JSON.stringify(userToyList));

    return userToyList;
  },

  create: async ({ userId, toyName, colorName, accessoryName }) => {
    const userRepository = UserRepository();
    const user = await userRepository.findOne({ _id: userId });

    const [toy, color, accessory] = await getEntitiesByName({
      toyName,
      colorName,
      accessoryName,
    });

    const userToyRepository = UserToyRepository();
    let userToy = await userToyRepository.findOne({
      user,
      toy,
      color,
      accessory,
    });

    if (userToy) {
      userToy.quantity += 1;
      await userToy.save();
    } else {
      userToy = await userToyRepository.create({
        user,
        toy,
        color,
        accessory,
      });

      user.toys.push(userToy['_id']);
      await user.save();
    }

    const cacheKey = `user_toy_list_${userId}`;
    await CacheService.del(cacheKey);

    return {
      user: user.email,
      toy: toyName,
      color: colorName,
      accessory: accessoryName,
      quantity: userToy.quantity,
    };
  },
};

const getEntitiesById = async ({ toyId, colorId, accessoryId }) => {
  const repositories = [
    {
      repository: ToyRepository(),
      id: toyId,
      model: 'toy',
    },
    {
      repository: ColorRepository(),
      id: colorId,
      model: 'color',
    },
    {
      repository: AccessoryRepository(),
      id: accessoryId,
      model: 'accessory',
    },
  ];

  const results = await Promise.all(
    repositories.map(({ repository, id }) => repository.findOne({ _id: id })),
  );

  const errors = repositories
    .filter((_, index) => !results[index])
    .reduce((acc, { id, model }) => {
      acc[model] = `${id} not found`;
      return acc;
    }, {});

  if (Object.keys(errors).length > 0) {
    throw {
      error: ErrorType.EntityNotFound,
      message:
        'Some entities were not found. Please contact support. Error code: DS-UTS-GEI',
      errors,
    };
  }

  return results.map(({ name }) => name);
};

const getEntitiesByName = async ({ toyName, colorName, accessoryName }) => {
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
