const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { RedisMemoryServer } = require('redis-memory-server');
const MongoDB = require('@src/infrastructure/MongoDB');
const RedisCache = require('@src/infrastructure/RedisCache');

let mongoServer;
let redisServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  let mongoUri = mongoServer.getUri();

  await MongoDB.connect(mongoUri);
  await MongoDB.initialize();

  redisServer = new RedisMemoryServer();
  let redisUri = {
    url: `redis://${await redisServer.getHost()}:${await redisServer.getPort()}`,
  };

  await RedisCache.connect(redisUri);
});

afterAll(async () => {
  await MongoDB.disconnect();

  if (mongoServer) await mongoServer.stop();
  if (redisServer) await redisServer.stop();
});
