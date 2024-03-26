const mysql = require("mysql-test");
const SequelizeRepository = require("../app/infrastructure/db/SequelizeRepository");
const setup = async (globalConfig, projectConfig) => {
  let sequelize;

  const server = mysql.createServer();
  server.listen();

  sequelize = SequelizeRepository.config();

  const models = [require("../app/domain/models/UserModel")];
  models.forEach((model) => model(sequelize));

  await sequelize.sync({ force: true });
  await sequelize.close();

  globalThis.__MYSQL__ = server;
};

module.exports = setup;
