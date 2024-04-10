const request = require('supertest');

const app = require('@src/app');

describe('GET /user-toy/ranking', () => {
  test('Should return confirm email', async () => {
    const response = await request(app).get('/user-toy/ranking');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Ranking');
  });
});
