const dotenv = require('dotenv');
const { rateLimit } = require('express-rate-limit');

dotenv.config();

const Config = {
  scope: process.env.SCOPE,
  port: process.env.PORT,
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiration: process.env.JWT_EXPIRATION,
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    db: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
  elasticsearch: {
    uri: process.env.ELASTICSEARCH_URI,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
  },
  morgan: process.env.MORGAN_FORMAT,
  page_size: parseInt(process.env.PAGE_SIZE),
  user_toy_cache_expiration: parseInt(
    process.env.USER_TOY_CACHE_EXPIRATION_MILLISECONDS,
  ),
  limiter: rateLimit({
    windowMs: parseInt(process.env.LIMITER_WINDOW_MS),
    max: parseInt(process.env.LIMITER_WINDOW_MAX_REQUESTS),
    standardHeaders: false,
    legacyHeaders: false,
  }),
  verify_email: process.env.VERIFY_EMAIL_ENABLED === 'true',
  mailersend: {
    api_key: process.env.MAILERSEND_API_KEY,
    from_email: process.env.MAILERSEND_FROM_EMAIL,
  },
};

module.exports = Config;
