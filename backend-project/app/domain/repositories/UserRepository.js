const UserModel = require("../models/UserModel");

const UserRepository = (sequelize) => {
  return UserModel(sequelize);
};

module.exports = UserRepository;
