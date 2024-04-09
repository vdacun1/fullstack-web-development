module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testTimeout: 30000,
  globalSetup: './test/globalSetup.js',
  globalTeardown: './test/globalTeardown.js',
};
