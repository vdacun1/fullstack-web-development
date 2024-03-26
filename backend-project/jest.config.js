module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  globalSetup: "./test/jest.setup.js",
  globalTeardown: "./test/jest.teardown.js",
};
