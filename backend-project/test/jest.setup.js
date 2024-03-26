const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const dotenv = require("dotenv");

dotenv.config();

let server;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  await mongoose.connect(server.getUri(), {});
});

afterAll(async () => {
  if (server) await server.stop();

  await mongoose.connection.close();
});
