const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { RedisMemoryServer } = require('redis-memory-server');
const uuid = require('uuid');

const app = require('@src/app');
const MongoDB = require('@src/infrastructure/MongoDB');
const RedisCache = require('@src/infrastructure/RedisCache');
const UserService = require('@src/domain/services/UserService');
const UserRepository = require('@src/domain/repositories/UserRepository');
const CacheService = require('@src/domain/services/CacheService');

describe('POST /user/confirm-email', () => {
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
    const redisUri = `redis://${host}:${port}`;
    await RedisCache.connect({ url: redisUri });
  });

  afterAll(async () => {
    await MongoDB.disconnect();
    await RedisCache.disconnect();
    mongoServer.stop();
    redisServer.stop();
  });

  test('Should confirm email successfully', async () => {
    const email = 'c2343cx3r@c2ob7cq.com';
    const email_verification_code = uuid.v4();

    await request(app).post('/user/register').send({
      email,
      password: 'password',
    });

    const userRepository = UserRepository();
    const { _id } = await userRepository.findOneAndUpdate(
      { email },
      { email_verified: false, email_verification_code },
    );
    await CacheService.groupSet(
      CacheService.keys.EMAIL_VERIFICATION,
      email_verification_code,
      _id.toString(),
    );

    const response = await request(app).get(
      `/user/confirm-email/${email_verification_code}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('Email verified successfully');
  });

  test('Should not confirm email due to invalid confirmation code', async () => {
    await request(app).post('/user/register').send({
      email: 'c2343cx3r@c2ob7cq.com',
      password: 'password',
    });

    const { _id } = await UserService.getUserByEmail('c2343cx3r@c2ob7cq.com');
    const { email_verification_code } =
      await UserService.getEmailVerificationCodeByUserId(_id);

    const response = await request(app).get(
      `/user/confirm-email/${email_verification_code}a`,
    );

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe(404);
    expect(response.body.message).toBe('Invalid email verification code');
  });

  test('Should not confirm email due to expire confirmation code', async () => {
    const email = 'c2343cx3r@c2ob7cq.com';
    const email_verification_code = uuid.v4();

    await request(app).post('/user/register').send({
      email,
      password: 'password',
    });

    const userRepository = UserRepository();
    const { _id } = await userRepository.findOneAndUpdate(
      { email },
      { email_verified: false, email_verification_code: uuid.v4() },
    );
    await CacheService.groupSet(
      CacheService.keys.EMAIL_VERIFICATION,
      email_verification_code,
      _id.toString(),
    );

    const response = await request(app).get(
      `/user/confirm-email/${email_verification_code}`,
    );

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe(404);
    expect(response.body.message).toBe('Verification code is expired');
  });
});
