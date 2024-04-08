const redis = require('redis');

const Config = require('./Config');

let redisClient = null;

const getRedisUri = () => {
  const auth = `${Config.redis.user}:${Config.redis.password}`;
  const host = `${Config.redis.host}:${Config.redis.port}`;

  return { url: `redis://${auth}@${host}` };
};

const RedisCache = {
  connect: async (redisUri = getRedisUri()) => {
    redisClient = redis.createClient(redisUri);

    return await redisClient.connect();
  },
  getClient: () => {
    return redisClient;
  },
};

module.exports = RedisCache;
