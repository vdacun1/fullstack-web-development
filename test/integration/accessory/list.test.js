const request = require('supertest');

const app = require('@src/app');
const { log } = require('@src/infrastructure/Logger');

describe('GET /accessory/list', () => {
  test('Should return a list of accessories', async () => {
    const response = await request(app).get('/accessory/list');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body).toHaveLength(3);
  });
});
