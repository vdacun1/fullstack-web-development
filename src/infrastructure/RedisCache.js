const redis = require('redis');

const Config = require('./Config');

let redisClient = null;

const getRedisUri = () => {
  const auth = `${Config.redis.user}:${Config.redis.password}`;
  const host = `${Config.redis.host}:${Config.redis.port}`;

  return { url: `redis://${auth}@${host}` };
};

const RedisCache = {
  connect: async (redisUri) => {
    if (!redisUri) {
      redisUri = getRedisUri();
    }
    redisClient = redis.createClient(redisUri);

    return await redisClient.connect();
  },
  disconnect: async () => {
    return await redisClient.quit();
  },
  getClient: () => {
    return redisClient;
  },
};

module.exports = RedisCache;
