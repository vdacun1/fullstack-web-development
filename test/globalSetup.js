const mongoose = require('mongoose');
mongoose.set('debug', true);

module.exports = async () => {
  process.env.MONGO_PORT = 27018;
  process.env.REDIS_PORT = 6380;
  process.env.USER_TOY_CACHE_EXPIRATION_MILLISECONDS = 100;
};
