const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const JWTService = {
  sign: (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRATION,
    });
  },
};

module.exports = JWTService;
