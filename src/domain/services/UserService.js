const CryptService = require("./CryptService");

const UserRepository = require("../repositories/UserRepository");

const UserService = {
  register: async ({ email, password }) => {
    const userRepository = UserRepository();

    const hashedPassword = await CryptService.hash(password);

    return await userRepository.create({ email, password: hashedPassword });
  },
};

module.exports = UserService;
