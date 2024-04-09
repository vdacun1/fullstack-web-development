const request = require('supertest');

const app = require('@src/app');
const MongoDB = require('@src/infrastructure/MongoDB');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('POST /user/register', () => {
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

  test('Should create the user successfully', async () => {
    const response = await request(app).post('/user/register').send({
      email: 'v03b94@gmail.com',
      password: 'password',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.message).toBe(
      'User registered successfully: v03b94@gmail.com',
    );
  });

  test('Should not create user due to conflict', async () => {
    const response = await request(app).post('/user/register').send({
      email: 'v03b94@gmail.com',
      password: 'password',
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.status).toBe(409);
    expect(response.body.message).toBe('User already exists');
  });

  test('Should not create user due to conflict whit normalized email', async () => {
    const response = await request(app).post('/user/register').send({
      email: 'v03b94+123456@gmail.com',
      password: 'password',
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.status).toBe(409);
    expect(response.body.message).toBe('User already exists');
  });

  test('Should not create user due to validation - Without email', async () => {
    const response = await request(app).post('/user/register').send({
      password: 'password',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
    expect(response.body.errors.email).toBe('Invalid value');
  });

  test('Should not create user due to validation - Without email', async () => {
    const response = await request(app).post('/user/register').send({
      email: 'user+123456@gmail.com',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
    expect(response.body.errors.password).toBe('Invalid value');
  });
});
