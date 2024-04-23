const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { RedisMemoryServer } = require('redis-memory-server');

const app = require('@src/app');
const MongoDB = require('@src/infrastructure/MongoDB');
const RedisCache = require('@src/infrastructure/RedisCache');

describe('UserToy DELETE /user-toy/delete', () => {
  let token;
  let mongoServer;
  let mongoUri;
  let redisServer;
  let userToyId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    await MongoDB.connect(mongoUri);
    await MongoDB.initialize();

    redisServer = await RedisMemoryServer.create();
    await redisServer.start();
    const host = await redisServer.getHost();
    const port = await redisServer.getPort();
    const redisUri = {
      url: `redis://${host}:${port}`,
    };

    await RedisCache.connect(redisUri);

    await request(app).post('/user/register').send({
      email: 'v45c34@c34y98.com',
      password: 'password',
    });

    const login = await request(app).post('/auth/login').send({
      email: 'v45c34@c34y98.com',
      password: 'password',
    });

    token = login.body.token;

    await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${token}`)
      .send({
        toy: 'perro',
        color: 'rosa',
        accessory: 'camiseta y pelota de fútbol',
      });

    await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${token}`)
      .send({
        toy: 'perro',
        color: 'rosa',
        accessory: 'camiseta y pelota de fútbol',
      });

    const list = await request(app)
      .get('/user-toy/list')
      .set('Authorization', `${token}`)
      .send();

    userToyId = list.body[0]._id;
  });

  afterAll(async () => {
    await MongoDB.disconnect();
    await RedisCache.disconnect();
    mongoServer.stop();
    redisServer.stop();
  });

  test('Should decrement the quantity of a user toy successfully', async () => {
    const response = await request(app)
      .delete(`/user-toy/delete/${userToyId}`)
      .set('Authorization', `${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User toy quantity decremented');
  });

  test('Should delete a user toy successfully', async () => {
    const response = await request(app)
      .delete(`/user-toy/delete/${userToyId}`)
      .set('Authorization', `${token}`)
      .send();

    expect(response.statusCode).toBe(204);
  });

  test('Should return not found', async () => {
    const response = await request(app)
      .delete(`/user-toy/delete/${userToyId}`)
      .set('Authorization', `${token}`)
      .send();

    expect(response.statusCode).toBe(404);
  });

  test('Should return a validation error', async () => {
    const response = await request(app)
      .delete(`/user-toy/delete/wrong`)
      .set('Authorization', `${token}`)
      .send();

    expect(response.statusCode).toBe(400);
  });
});
