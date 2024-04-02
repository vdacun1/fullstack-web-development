const RedisCache = require('../../infrastructure/RedisCache');

const CacheService = {
  set: async (key, value, expiration) => {
    const redis = RedisCache.getClient();
    return await redis.set(key, value, 'EX', expiration);
  },
  get: async (key) => {
    const redis = RedisCache.getClient();
    return await redis.get(key);
  },
};

module.exports = CacheService;
