const winston = require('winston');
const path = require('path');
const callsite = require('callsite');
const morgan = require('morgan');

const { ecsFormat } = require('@elastic/ecs-winston-format');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const Context = require('./Context');
const Config = require('./Config');

const esTransport = new ElasticsearchTransport({
  level: 'info',
  index: 'backend',
  indexPrefix: 'node-api-',
  clientOpts: {
    node: Config.elasticsearch.uri,
  },
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.cli(),
});

let logger = winston.createLogger({
  format: ecsFormat(),
  transports: [esTransport, consoleTransport],
});

const metadata = () => {
  const stack = callsite();
  const frame = stack[2];

  return {
    service: 'backend',
    environment: Config.scope,
    request_id: Context.getRequestId(),
    file: path.basename(frame.getFileName(), '.js'),
    caller: frame.getFunctionName(),
  };
};

const Logger = {
  log: {
    info: (message) => {
      logger.info(message, metadata());
    },
    warn: (message) => {
      logger.warn(message, metadata());
    },
    error: (message) => {
      logger.error(message, metadata());
    },
  },

  morgan: morgan(Config.morgan, {
    stream: {
      write: (message) => {
        logger.info(message, metadata());
      },
    },
  }),
};

module.exports = Logger;
