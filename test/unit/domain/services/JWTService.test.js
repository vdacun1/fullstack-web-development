const jwt = require('jsonwebtoken');
const Config = require('@src/infrastructure/Config');
const JWTService = require('@src/domain/services/JWTService');

describe('JWTService', () => {
  const mockPayload = { id: '1', name: 'User 1' };
  const mockToken = jwt.sign(mockPayload, Config.jwt.secretKey, {
    expiresIn: parseInt(Config.jwt.expiration, 10),
  });

  test('should sign a payload', () => {
    const result = JWTService.sign(mockPayload);

    expect(result).not.toBeNull();
    expect(typeof result).toBe('string');
  });

  test('should decode a token', () => {
    const result = JWTService.decode(mockToken);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('iat');
    expect(result).toHaveProperty('exp');

    // Additional checks for the values
    expect(result.id).toBe(mockPayload.id);
    expect(result.name).toBe(mockPayload.name);
  });
});
