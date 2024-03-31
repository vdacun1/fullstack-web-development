const UserRepository = require("../repositories/UserRepository");

const UserService = {
  register: async ({ email, password }) => {
    const userRepository = UserRepository();
    return await userRepository.create({ email, password });
  },

  getUserByEmail: async (email) => {
    const userRepository = UserRepository();
    return userRepository.findOne({ email }).select("+password");
  },
};

module.exports = UserService;
