const rewire = require('rewire');
jest.mock('@src/infrastructure/Config');

const MongoDB = rewire('../../../src/infrastructure/MongoDB');

describe('getMongoUri', () => {
  it('should return the correct MongoDB URI', () => {
    const expectedUri =
      'mongodb://test_user:test_password@localhost:27017/test';

    // Use __get__ to retrieve the non-exported function
    const getMongoUri = MongoDB.__get__('getMongoUri');
    const actualUri = getMongoUri();

    expect(actualUri).toBe(expectedUri);
  });
});
