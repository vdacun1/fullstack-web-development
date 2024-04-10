const RedisCache = require('../../infrastructure/RedisCache');

const CacheService = {
  set: async (key, value) => {
    const redis = RedisCache.getClient();
    return await redis.set(key, value);
  },
  get: async (key) => {
    const redis = RedisCache.getClient();
    return await redis.get(key);
  },
  del: async (key) => {
    const redis = RedisCache.getClient();
    return await redis.del(key);
  },
};

module.exports = CacheService;
