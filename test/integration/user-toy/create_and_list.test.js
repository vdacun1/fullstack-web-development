const request = require('supertest');

const app = require('@src/app');
const MongoDB = require('@src/infrastructure/MongoDB');
const RedisCache = require('@src/infrastructure/RedisCache');
describe('AIO - UserToy POST /user-toy/create & GET /user-toy/list', () => {
  let token;

  beforeAll(async () => {
    await MongoDB.connect(globalThis.__MONGO_URI__);
    await RedisCache.connect(globalThis.__REDIS_URI__);

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
    expect(list2.body[1].toy).toBe('gato');
    expect(list2.body[1].color).toBe('amarillo');
    expect(list2.body[1].accessory).toBe('guitarra eléctrica');
    expect(list2.body[1].quantity).toBe(1);
  });
});
