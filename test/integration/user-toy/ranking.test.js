const request = require('supertest');
const app = require('@src/app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const MongoDB = require('@src/infrastructure/MongoDB');
const { RedisMemoryServer } = require('redis-memory-server');
const RedisCache = require('@src/infrastructure/RedisCache');

describe('GET /user-toy/ranking', () => {
  let token;
  let mongoServer;
  let mongoUri;
  let redisServer;

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
      email: 'i37c2@cqw8y.com',
      password: 'password',
    });

    const login = await request(app).post('/auth/login').send({
      email: 'i37c2@cqw8y.com',
      password: 'password',
    });

    token = login.body.token;

    for (let i = 0; i < 10; i++) {
      await request(app)
        .post('/user-toy/create')
        .set('Authorization', `${token}`)
        .send({
          toy: 'perro',
          color: 'rosa',
          accessory: 'camiseta y pelota de fútbol',
        });
    }

    for (let i = 0; i < 5; i++) {
      await request(app)
        .post('/user-toy/create')
        .set('Authorization', `${token}`)
        .send({
          toy: 'gato',
          color: 'amarillo',
          accessory: 'notebook',
        });
    }

    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/user-toy/create')
        .set('Authorization', `${token}`)
        .send({
          toy: 'mapache',
          color: 'rosa',
          accessory: 'guitarra eléctrica',
        });
    }
  });

  afterAll(async () => {
    await MongoDB.disconnect();
    await RedisCache.disconnect();
    mongoServer.stop();
    redisServer.stop();
  });

  test('Should return the ranking from database', async () => {
    const response = await request(app).get('/user-toy/ranking');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  test('Should return the ranking from cache', async () => {
    const response = await request(app).get('/user-toy/ranking');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  test('Should return the ranking from database after cache expiration', async () => {
    await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${token}`)
      .send({
        toy: 'mapache',
        color: 'rosa',
        accessory: 'guitarra eléctrica',
      });

    await new Promise((resolve) => setTimeout(resolve, 101));
    const response = await request(app).get('/user-toy/ranking');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  test('Should return the ranking from cache after even after toy creation', async () => {
    await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${token}`)
      .send({
        toy: 'mapache',
        color: 'rosa',
        accessory: 'guitarra eléctrica',
      });

    const response = await request(app).get('/user-toy/ranking');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});
