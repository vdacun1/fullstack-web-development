const bcrypt = require("bcrypt");

const CryptService = {
  hash: async (data) => {
    // Salt Rounds is a number that determines the complexity of the hashing
    // algorithm. The cost of hashing the password increases with the number
    // of salt rounds. The higher the number, the more secure the password
    // will be. The recommended number of salt rounds is 10.
    // Complexity: O(2^saltRounds)
    const saltRounds = 10;

    return await bcrypt.hash(data, saltRounds);
  },

  compare: async (data, hash) => {
    return await bcrypt.compare(data, hash);
  },
};

module.exports = CryptService;
