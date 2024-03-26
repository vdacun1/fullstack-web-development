const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

const SequelizeRepository = {
  config: () => {
    dotenv.config();
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const host = process.env.MYSQL_HOST;
    const port = process.env.MYSQL_PORT;
    const database = process.env.MYSQL_DATABASE;

    return new Sequelize(
      `mysql://${user}:${password}@${host}:${port}/${database}`,
    );
  },
};

module.exports = SequelizeRepository;
