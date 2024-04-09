const request = require('supertest');

const app = require('@src/app');
const MongoDB = require('@src/infrastructure/MongoDB');

describe('GET /toy/list', () => {
  beforeAll(async () => {
    await MongoDB.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoDB.disconnect();
  });
  test('Should return a list of accessories', async () => {
    const response = await request(app).get('/toy/list');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body).toHaveLength(5);
  });
});
