const winston = require("winston");
const Logger = require("@src/infrastructure/Logger");
let callsite = require("callsite");

jest.mock("winston", () => ({
  createLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
  format: {
    cli: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
  },
}));

jest.mock("@src/infrastructure/Context", () => ({
  getRequestId: jest.fn(),
}));

describe("Logger class", () => {
  let logger;

  beforeEach(() => {
    logger = Logger.log;
  });

  test("should log info messages", () => {
    const message = "Test info message";
    logger.info(message);
    expect(winston.createLogger().info).toHaveBeenCalledWith(
      message,
      expect.any(Object),
    );
  });

  test("should log warn messages", () => {
    const message = "Test warn message";
    logger.warn(message);
    expect(winston.createLogger().warn).toHaveBeenCalledWith(
      message,
      expect.any(Object),
    );
  });

  test("should log error messages", () => {
    const message = "Test error message";
    logger.error(message);
    expect(winston.createLogger().error).toHaveBeenCalledWith(
      message,
      expect.any(Object),
    );
  });
});
