const request = require('supertest');

const app = require('@src/app');
const MongoDB = require('@src/infrastructure/MongoDB');

describe('POST /auth/login', () => {
  beforeAll(async () => {
    await MongoDB.connect(globalThis.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoDB.disconnect();
  });

  test('Should login successfully', async () => {
    await request(app).post('/user/register').send({
      email: '2c938y13o2@v98q2ty.com',
      password: 'password',
    });

    const response = await request(app).post('/auth/login').send({
      email: '2c938y13o2@v98q2ty.com',
      password: 'password',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('Login success');
    expect(response.body.token).not.toBeNull();
  });

  test('Should return error - Wrong password', async () => {
    await request(app).post('/user/register').send({
      email: 'c282no@v98q2tz.com',
      password: 'password',
    });

    const response = await request(app).post('/auth/login').send({
      email: 'c282no@v98q2tz.com',
      password: 'password1',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.status).toBe(401);
    expect(response.body.message).toBe('Wrong email or password');
  });

  test('Should return error - User not found', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'invalidemail@invalidserver.com',
      password: 'password',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.status).toBe(401);
    expect(response.body.message).toBe('Wrong email or password');
  });

  test('Should return validation error - Email invalid value', async () => {
    const response = await request(app).post('/auth/login').send({
      password: 'password',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.email).toBe('Invalid value');
  });

  test('Should return validation error - Password invalid value', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'user@email.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.password).toBe('Invalid value');
  });
});
