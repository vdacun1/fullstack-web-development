const UserRepository = require("../repositories/UserRepository");

const UserService = {
  async register({ email, password }) {
    const userRepository = UserRepository();
    return userRepository
      .create({ email, password })
      .then((user) => user)
      .catch((error) => {
        console.error(error);

        if (error.code === 11000) {
          throw { status: 409, message: "User already exists" };
        } else {
          throw { status: 500, message: "Error while registering user" };
        }
      });
  },
};

module.exports = UserService;
