const CacheService = require('./CacheService');
const Config = require('../../infrastructure/Config');
const EntityLookupService = require('./EntityLookupService');
const { log } = require('../../infrastructure/Logger');

const UserToyRepository = require('../repositories/UserToyRepository');
const UserRepository = require('../repositories/UserRepository');
const ErrorType = require('../constants/ErrorType');

const CACHE_EXPIRATION_MILLISECONDS = Config.user_toy_cache_expiration;

const UserToyService = {
  list: async (userId) => {
    const cacheKey = userId;
    const cachedUserToyList = await CacheService.groupGet(
      CacheService.keys.USER_TOY_LIST,
      cacheKey,
    );

    if (cachedUserToyList) {
      return JSON.parse(cachedUserToyList);
    }

    const userToyRepository = UserToyRepository();
    let userToys;

    userToys = await userToyRepository.getUserLastItemsCreated(userId);
    const userToyList = await Promise.all(
      userToys.map(async ({ _id, toy, color, accessory, quantity }) => {
        const [toyName, colorName, accessoryName] =
          await EntityLookupService.byId({
            toyId: toy,
            colorId: color,
            accessoryId: accessory,
          });

        return {
          _id,
          toy: toyName,
          color: colorName,
          accessory: accessoryName,
          quantity,
        };
      }),
    );

    await CacheService.groupSet(
      CacheService.keys.USER_TOY_LIST,
      cacheKey,
      JSON.stringify(userToyList),
    );

    return userToyList;
  },

  create: async ({ userId, toyName, colorName, accessoryName }) => {
    const userRepository = UserRepository();
    const user = await userRepository.findOne({ _id: userId });

    const [toy, color, accessory] = await EntityLookupService.byName({
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

    await CacheService.groupDel(CacheService.keys.USER_TOY_LIST, userId);
    await CacheService.set(CacheService.keys.NEW_TOYS_ADDED, 'true');

    return {
      user: user.email,
      toy: toyName,
      color: colorName,
      accessory: accessoryName,
      quantity: userToy.quantity,
    };
  },

  delete: async (userId, userToyId) => {
    const userToyRepository = UserToyRepository();
    const userToy = await userToyRepository.findOne({
      _id: userToyId,
      user: userId,
    });

    if (!userToy) {
      throw {
        type: ErrorType.EntityNotFound,
        message: 'User toy not found',
      };
    }

    await CacheService.groupDel(CacheService.keys.USER_TOY_LIST, userId);

    const { quantity } = userToy;
    if (quantity > 1) {
      userToy.quantity -= 1;
      await userToyRepository.findOneAndUpdate({ _id: userToyId }, userToy);

      return {
        message: 'User toy quantity decremented',
      };
    } else {
      await userToyRepository.findOneAndDelete({ _id: userToyId });

      return {
        message: 'User toy deleted',
      };
    }
  },

  /**
   * Retrieves the ranking of the most frequently used toys:
   *
   * This function manages the cache expiration and checks if new toys have been
   * added using the 'create' method above. This is tracked by a flag in the
   * cache named 'new_toys_added'.
   *
   * If the flag is set to true and the cache has expired, the cache will be
   * updated by executing the query to fetch the updated ranking.
   *
   * If the flag is set to false, the function will return the cached data,
   * regardless of its expiration status.
   *
   * If the flag is set to true and the cache has not expired, the function will
   * return the cached data as it is.
   */
  ranking: async () => {
    const cacheKey = CacheService.keys.USER_TOY_RANKING;
    const cachedData = await CacheService.get(cacheKey);
    const newToysAdded = await CacheService.get(
      CacheService.keys.NEW_TOYS_ADDED,
    );

    const currentTime = Date.now();

    if (cachedData) {
      const { timestamp, userToyRanking } = JSON.parse(cachedData);

      if (newToysAdded === 'false') {
        log.info('No new toys added, retrieving cached ranking.');
        return userToyRanking;
      }

      const msSinceLastUpdate = currentTime - timestamp;
      const isCacheExpired = msSinceLastUpdate >= CACHE_EXPIRATION_MILLISECONDS;

      if (!isCacheExpired) {
        log.info('Cache is not expired, retrieving cached ranking.');
        return userToyRanking;
      }
    }

    const userToyRepository = UserToyRepository();
    const globalRanking = await userToyRepository.getGlobalRanking();

    let userToyRanking = await Promise.all(
      globalRanking.map(async ({ _id, total }) => {
        const [toyName, colorName, accessoryName] =
          await EntityLookupService.byId({
            toyId: _id.toy,
            colorId: _id.color,
            accessoryId: _id.accessory,
          });

        return {
          toy: toyName,
          color: colorName,
          accessory: accessoryName,
          total,
        };
      }),
    );

    const dataToCache = {
      timestamp: currentTime,
      userToyRanking,
    };

    await CacheService.set(cacheKey, JSON.stringify(dataToCache));
    await CacheService.set(CacheService.keys.NEW_TOYS_ADDED, 'false');

    log.info('Retrieving ranking from database.');
    return userToyRanking;
  },
};

module.exports = UserToyService;
