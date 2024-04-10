const jwt = require('jsonwebtoken');
const Config = require('../../infrastructure/Config');

const JWT_SECRET_KEY = Config.jwt.secretKey;
const JWT_EXPIRATION = Config.jwt.expiration;

const JWTService = {
  sign: (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: parseInt(JWT_EXPIRATION, 10),
    });
  },

  decode: (token) => {
    jwt.verify(token, JWT_SECRET_KEY);
    return jwt.decode(token);
  },
};

module.exports = JWTService;
