const mongoose = require('mongoose');

const app = require('./app');
const MongoDB = require('./infrastructure/MongoDB');
const RedisCache = require('./infrastructure/RedisCache');
const Config = require('./infrastructure/Config');
const { log } = require('./infrastructure/Logger');

const PORT = Config.port;

log.info(`Starting server on port ${PORT}`);
mongoose.connect(MongoDB.getURI()).then(() => {
  log.info('Connected to MongoDB');

  RedisCache.connect().then(() => {
    log.info('Connected to Redis');

    app.listen(PORT, () => {
      console.info(`\n\tNODEJS  - App listening on: http://localhost:${PORT}/`);
      console.info(`\tMONGODB - Database client on: http://localhost:8081/`);
      console.info(`\tGRAFANA - Watch logs on: http://localhost:3000/`);
    });
  });
});
