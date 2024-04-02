const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let server;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  await mongoose.connect(server.getUri(), {});
});

afterAll(async () => {
  if (server) await server.stop();

  await mongoose.connection.close();
});
