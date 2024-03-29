const bcrypt = require("bcrypt");
const HttpStatus = require("../constants/HttpStatus");

const CryptService = {
  hash: async (data) => {
    const saltRounds = 10;

    return await bcrypt
      .hash(data, saltRounds)

      .then((hash) => hash)

      .catch((error) => {
        throw {
          status: HttpStatus.SERVER_ERROR,
          message: "Error while hashing password",
        };
      });
  },
};

module.exports = CryptService;
