const { log } = require("../../infrastructure/Logger");
const HttpStatus = require("../constants/HttpStatus");
const CryptService = require("./CryptService");

const UserRepository = require("../repositories/UserRepository");

const UserService = {
  register: async ({ email, password }) => {
    const userRepository = UserRepository();

    const hashedPassword = await CryptService.hash(password);

    return await userRepository
      .create({ email, password: hashedPassword })

      .then(() => {
        return {
          status: HttpStatus.CREATED,
          message: "User registered successfully",
        };
      })

      .catch((error) => {
        log.error(error);

        if (error.code === 11000) {
          throw { status: HttpStatus.CONFLICT, message: "User already exists" };
        } else {
          throw {
            status: HttpStatus.SERVER_ERROR,
            message: "Error while registering user",
          };
        }
      });
  },
};

module.exports = UserService;
