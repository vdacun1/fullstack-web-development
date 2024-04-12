const RedisCache = require('../../infrastructure/RedisCache');
const CacheKeys = require('../constants/CacheKeys');

const CacheService = {
  set: async (key, value) => {
    const redis = RedisCache.getClient();
    return await redis.set(key, value);
  },
  groupSet: async (group, key, value) => {
    const redis = RedisCache.getClient();
    return await redis.hSet(group, key, value);
  },
  get: async (key) => {
    const redis = RedisCache.getClient();
    return await redis.get(key);
  },
  groupGet: async (group, key) => {
    const redis = RedisCache.getClient();
    return await redis.hGet(group, key);
  },
  del: async (key) => {
    const redis = RedisCache.getClient();
    return await redis.del(key);
  },
  groupDel: async (group, key) => {
    const redis = RedisCache.getClient();
    return await redis.hDel(group, key);
  },
  keys: CacheKeys,
};

module.exports = CacheService;
