const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const MongoDB = require('@src/infrastructure/MongoDB');

let server;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  let mongoUri = server.getUri();

  await MongoDB.connect(mongoUri);

  await MongoDB.initialize();
});

afterAll(async () => {
  await MongoDB.disconnect();

  if (server) await server.stop();
});
