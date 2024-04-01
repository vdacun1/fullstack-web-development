const jwt = require("jsonwebtoken");
const Config = require("../../infrastructure/Config");

const JWT_SECRET_KEY = Config.jwt.secretKey;
const JWT_EXPIRATION = Config.jwt.expiration;

const JWTService = {
  sign: (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRATION,
    });
  },
};

module.exports = JWTService;
