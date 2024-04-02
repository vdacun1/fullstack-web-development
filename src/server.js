const app = require('./app');
const MongoDB = require('./infrastructure/MongoDB');
const RedisCache = require('./infrastructure/RedisCache');
const Config = require('./infrastructure/Config');
const { log } = require('./infrastructure/Logger');

const PORT = Config.port;

log.info(`Starting server on port ${PORT}`);
log.info('Connecting to MongoDB');
MongoDB.connect().then(() => {
  log.info('Connected to MongoDB');

  log.info('Connecting to Redis');
  RedisCache.connect().then(() => {
    log.info('Connected to Redis');

    app.listen(PORT, () => {
      log.info(`NODEJS  - App listening on: http://localhost:${PORT}/`);
      log.info(`MONGODB - Database client on: http://localhost:8081/`);
      log.info(`GRAFANA - Watch logs on: http://localhost:3000/`);
    });
  });
});
