const request = require('supertest');

const app = require('@src/app');
const MongoDB = require('@src/infrastructure/MongoDB');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('GET /color/list', () => {
  let mongoServer;
  let mongoUri;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    await MongoDB.connect(mongoUri);
    await MongoDB.initialize();
  });

  afterAll(async () => {
    await MongoDB.disconnect();
    mongoServer.stop();
  });
  
  test('Should return a list of accessories', async () => {
    const response = await request(app).get('/color/list');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body).toHaveLength(3);
  });
});
