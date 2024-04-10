const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { RedisMemoryServer } = require('redis-memory-server');

const app = require('@src/app');
const MongoDB = require('@src/infrastructure/MongoDB');
const RedisCache = require('@src/infrastructure/RedisCache');
const JWTService = require('@src/domain/services/JWTService');

describe('AIO - UserToy POST /user-toy/create & GET /user-toy/list', () => {
  let token;
  let mongoServer;
  let mongoUri;
  let redisServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    await MongoDB.connect(mongoUri);
    await MongoDB.initialize();

    redisServer = await RedisMemoryServer.create({
      instance: {
        port: 6380,
        args: ['--requirepass', 'redis_password'],
      },
    });
    await redisServer.start();
    await RedisCache.connect();

    await request(app).post('/user/register').send({
      email: 'pqnc98y@x9p182.com',
      password: 'password',
    });

    const login = await request(app).post('/auth/login').send({
      email: 'pqnc98y@x9p182.com',
      password: 'password',
    });

    token = login.body.token;
  });

  afterAll(async () => {
    await MongoDB.disconnect();
    await RedisCache.disconnect();
    mongoServer.stop();
    redisServer.stop();
  });

  test('Should create a user toy successfully', async () => {
    const response = await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${token}`)
      .send({
        toy: 'perro',
        color: 'rosa',
        accessory: 'camiseta y pelota de fútbol',
      });

    expect(response.statusCode).toBe(201);
  });

  test('Should get a list of one user toy successfully', async () => {
    const list1 = await request(app)
      .get('/user-toy/list')
      .set('Authorization', `${token}`);

    expect(list1.statusCode).toBe(200);
    expect(list1.body).toHaveLength(1);
    expect(list1.body[0].toy).toBe('perro');
    expect(list1.body[0].color).toBe('rosa');
    expect(list1.body[0].accessory).toBe('camiseta y pelota de fútbol');
    expect(list1.body[0].quantity).toBe(1);
  });

  test('Should add +1 user toy successfully', async () => {
    const response = await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${token}`)
      .send({
        toy: 'perro',
        color: 'rosa',
        accessory: 'camiseta y pelota de fútbol',
      });

    expect(response.statusCode).toBe(200);
  });

  test('Should get a list of one user toy successfully with quantity 2', async () => {
    const list2 = await request(app)
      .get('/user-toy/list')
      .set('Authorization', `${token}`);

    expect(list2.statusCode).toBe(200);
    expect(list2.body).toHaveLength(1);
    expect(list2.body[0].toy).toBe('perro');
    expect(list2.body[0].color).toBe('rosa');
    expect(list2.body[0].accessory).toBe('camiseta y pelota de fútbol');
    expect(list2.body[0].quantity).toBe(2);
  });

  test('Should create another user toy successfully', async () => {
    const response = await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${token}`)
      .send({
        toy: 'gato',
        color: 'amarillo',
        accessory: 'guitarra eléctrica',
      });

    expect(response.statusCode).toBe(201);
  });

  test('Should get a list of two user toys successfully', async () => {
    const list2 = await request(app)
      .get('/user-toy/list')
      .set('Authorization', `${token}`);

    expect(list2.statusCode).toBe(200);
    expect(list2.body).toHaveLength(2);
    expect(list2.body[0].toy).toBe('gato');
    expect(list2.body[0].color).toBe('amarillo');
    expect(list2.body[0].accessory).toBe('guitarra eléctrica');
    expect(list2.body[0].quantity).toBe(1);
  });

  test('Should not create another user toy due to validation', async () => {
    const wrongToken = JWTService.sign({ user: '123' });

    const response = await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${wrongToken}`)
      .send({
        toy: 'gato',
        color: 'amarillo',
        accessory: 'guitarra eléctrica',
      });

    expect(response.statusCode).toBe(400);
  });

  test('Should not get a list of user toys due to validation', async () => {
    const wrongToken = JWTService.sign({ user: '123' });
    const response = await request(app)
      .get('/user-toy/list')
      .set('Authorization', `${wrongToken}`);

    expect(response.statusCode).toBe(400);
  });

  test('Should not get a list of user toys due to authorization', async () => {
    const wrongToken = 'wrongToken';
    const response = await request(app)
      .get('/user-toy/list')
      .set('Authorization', `${wrongToken}`);

    expect(response.statusCode).toBe(401);
  });

  test('Should get a list of two user toys successfully from cache', async () => {
    const list2FromCache = await request(app)
      .get('/user-toy/list')
      .set('Authorization', `${token}`);

    expect(list2FromCache.statusCode).toBe(200);
    expect(list2FromCache.body).toHaveLength(2);
    expect(list2FromCache.body[0].toy).toBe('gato');
    expect(list2FromCache.body[0].color).toBe('amarillo');
    expect(list2FromCache.body[0].accessory).toBe('guitarra eléctrica');
    expect(list2FromCache.body[0].quantity).toBe(1);
  });

  test('Should not create another user toy due to toy, color and accessory not found', async () => {
    const response = await request(app)
      .post('/user-toy/create')
      .set('Authorization', `${token}`)
      .send({
        toy: 'toy0',
        color: 'color0',
        accessory: 'accessory0',
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe(404);
    expect(response.body.message).toBe('Some entities were not found');
    expect(response.body.errors.toy).toBe('toy0 not found');
    expect(response.body.errors.color).toBe('color0 not found');
    expect(response.body.errors.accessory).toBe('accessory0 not found');
  });
});
