const { MongoMemoryServer } = require('mongodb-memory-server');
const { RedisMemoryServer } = require('redis-memory-server');
const MongoDB = require('../src/infrastructure/MongoDB');
const RedisCache = require('../src/infrastructure/RedisCache');

const { set } = require('mongoose');
set('debug', true);

module.exports = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  globalThis.__MONGO_URI__ = mongoUri;

  await MongoDB.connect(mongoUri);
  await MongoDB.initialize();

  const redisServer = new RedisMemoryServer();
  const host = await redisServer.getHost();
  const port = await redisServer.getPort();
  globalThis.__REDIS_URI__ = {
    url: `redis://${host}:${port}`,
  };

  globalThis.__MONGO_SERVER__ = mongoServer;
  globalThis.__REDIS_SERVER__ = redisServer;
};
