const UserRepository = require("../repositories/UserRepository");
const SequelizeRepository = require("../../infrastructure/db/SequelizeRepository");

const UserService = {
  async register({ email, password }) {
    const sequelize = SequelizeRepository.config();

    const userRepository = UserRepository(sequelize);
    const user = await userRepository.create({ email, password });

    await sequelize.close();

    return user;
  },
};

module.exports = UserService;
