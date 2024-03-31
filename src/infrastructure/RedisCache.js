const dotenv = require("dotenv");
const redis = require("redis");

const { log } = require("./Logger");

let redisClient = null;

const getRedisUri = () => {
  dotenv.config();

  const auth = `${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}`;
  const host = `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

  return { url: `redis://${auth}@${host}` };
};

const RedisCache = {
  connect: async () => {
    redisClient = redis.createClient(getRedisUri());

    return await redisClient.connect();
  },
  getClient: () => {
    return redisClient;
  },
};

module.exports = RedisCache;
