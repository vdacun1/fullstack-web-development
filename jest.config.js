module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  globalSetup: './test/globalSetup.js',
  globalTeardown: './test/globalTeardown.js',
  testMatch: ['<rootDir>/test/**/*.test.js'],
};
