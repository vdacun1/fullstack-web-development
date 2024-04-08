const request = require('supertest');

const app = require('@src/app');

describe('GET /color/list', () => {
  test('Should return a list of accessories', async () => {
    const response = await request(app).get('/color/list');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body).toHaveLength(3);
  });
});
