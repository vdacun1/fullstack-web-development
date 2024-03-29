const winston = require("winston");
const path = require("path");
const callsite = require("callsite");

const { ecsFormat } = require("@elastic/ecs-winston-format");
const { ElasticsearchTransport } = require("winston-elasticsearch");
const dotenv = require("dotenv");

const Session = require("./Session");

dotenv.config();

const esTransport = new ElasticsearchTransport({
  level: "info",
  index: "backend",
  indexPrefix: "node-api-",
  clientOpts: {
    node: process.env.ELASTICSEARCH_URI,
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

  const fileName = frame.getFileName() || "unknown";
  const functionName = frame.getFunctionName() || "anonymous";

  return {
    service: "backend",
    environment: process.env.NODE_ENV,
    request_id: Session.getRequestId(),
    file: path.basename(fileName, ".js"),
    caller: functionName || "anonymous",
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
};

module.exports = Logger;
