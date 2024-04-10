const request = require('supertest');
const MongoDB = require('@src/infrastructure/MongoDB');
const app = require('@src/app');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('GET /accessory/list', () => {
  let mongoServer;

  beforeAll(async () => {
    // This will test MongoDB.js getting the connection string from the environment
    mongoServer = await MongoMemoryServer.create({
      instance: {
        dbName: 'test',
        port: 27018,
      },
      auth: {
        enable: true,
        extraUsers: [
          {
            database: 'test',
            createUser: 'test_user',
            pwd: 'test_password',
            roles: [{ role: 'readWrite', db: 'test' }],
          },
        ],
      },
    });

    await MongoDB.connect();
    await MongoDB.initialize();
  });

  afterAll(async () => {
    await MongoDB.disconnect();
    mongoServer.stop();
  });

  test('Should return a list of accessories', async () => {
    const response = await request(app).get('/accessory/list');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body).toHaveLength(3);
  });
});
