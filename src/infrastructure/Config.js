const dotenv = require('dotenv');

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
  page_size: process.env.PAGE_SIZE,
};

module.exports = Config;
