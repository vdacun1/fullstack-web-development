const { log } = require("./Logger");

describe("Logger", () => {
  beforeEach(() => {
    console.info = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
    console.log = jest.fn();
  });

  test("should log info messages", () => {
    const message = "info message";
    log.info(message);
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  test("should log warning messages", () => {
    const message = "warning message";
    log.warn(message);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  test("should log error messages", () => {
    const error = new Error("error message");
    log.error(error);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(error.message),
    );
  });

  test("should log exceptions", () => {
    const error = new Error("exception message");
    log.exception(error);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(error.message),
      expect.stringContaining("Stack trace"),
    );
  });
});
