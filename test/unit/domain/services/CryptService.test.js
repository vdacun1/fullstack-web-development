const bcrypt = require('bcrypt');
const CryptService = require('@src/domain/services/CryptService');

describe('CryptService', () => {
  describe('hash', () => {
    test('should return a hashed string', async () => {
      const data = 'myData';
      const hashedData = await CryptService.hash(data);

      expect(hashedData).not.toEqual(data);
      expect(await bcrypt.compare(data, hashedData)).toBe(true);
    });
  });

  describe('compare', () => {
    test('should return true if data matches the hash', async () => {
      const data = 'myData';
      const hashedData = await CryptService.hash(data);
      const isMatch = await CryptService.compare(data, hashedData);

      expect(isMatch).toBe(true);
    });

    test('should throw an error if data does not match the hash', async () => {
      const data = 'myData';
      const hashedData = await CryptService.hash('otherData');

      await expect(CryptService.compare(data, hashedData)).rejects.toThrow(
        'Values do not match',
      );
    });
  });
});
