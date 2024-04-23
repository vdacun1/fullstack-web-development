const RedisCache = require('@src/infrastructure/RedisCache');
const CacheService = require('@src/domain/services/CacheService');

jest.mock('@src/infrastructure/RedisCache');

describe('CacheService', () => {
  let redisMock;

  beforeEach(() => {
    redisMock = {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
    };
    RedisCache.getClient.mockReturnValue(redisMock);
  });

  test('should set a value in the cache', async () => {
    const key = 'key';
    const value = 'value';

    await CacheService.set(key, value);

    expect(redisMock.set).toHaveBeenCalledWith(key, value);
  });

  test('should get a value from the cache', async () => {
    const key = 'key';
    const value = 'value';

    redisMock.get.mockResolvedValue(value);

    const result = await CacheService.get(key);

    expect(result).toEqual(value);
    expect(redisMock.get).toHaveBeenCalledWith(key);
  });

  test('should delete a value from the cache', async () => {
    const key = 'key';

    await CacheService.del(key);

    expect(redisMock.del).toHaveBeenCalledWith(key);
  });
});
