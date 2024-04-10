const { RedisMemoryServer } = require('redis-memory-server');
const RedisCache = require('@src/infrastructure/RedisCache');

describe('RedisCache', () => {
  test('should connect to redis memory server specifying redis uri', async () => {
    const redisServer = await RedisMemoryServer.create({
      instance: {
        port: 6390,
      },
    });
    await redisServer.start();

    const port = await redisServer.getPort();
    const redisUri = { url: `redis://localhost:${port}` };

    await RedisCache.connect(redisUri);
    const client = RedisCache.getClient();

    expect(client).toBeDefined();

    await RedisCache.disconnect();
    await redisServer.stop();
  });
});
