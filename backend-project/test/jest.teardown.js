const teardown = async (globalConfig, projectConfig) => {
  const server = globalThis.__MYSQL__;
  server.close();
};

module.exports = teardown;
