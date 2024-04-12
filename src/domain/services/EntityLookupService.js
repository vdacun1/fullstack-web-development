const ToyRepository = require('../repositories/ToyRepository');
const ColorRepository = require('../repositories/ColorRepository');
const AccessoryRepository = require('../repositories/AccessoryRepository');
const ErrorType = require('../constants/ErrorType');

const EntityLookupService = {
  byId: async ({ toyId, colorId, accessoryId }) => {
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
  },
  byName: async ({ toyName, colorName, accessoryName }) => {
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
  },
};

module.exports = EntityLookupService;
