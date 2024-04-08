const rewire = require('rewire');
jest.mock('@src/infrastructure/Config');

const RedisCache = rewire('../../../src/infrastructure/RedisCache');

describe('getRedisUri', () => {
  it('should return the correct Redis URI', () => {
    const expectedUri = {
      url: 'redis://:redis_password@localhost:6379',
    };

    // Use __get__ to retrieve the non-exported function
    const getRedisUri = RedisCache.__get__('getRedisUri');
    const actualUri = getRedisUri();

    expect(actualUri).toEqual(expectedUri);
  });
});
