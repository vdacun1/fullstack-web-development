const bcrypt = require('bcrypt');

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
    const isMatch = await bcrypt.compare(data, hash);

    if (!isMatch) {
      throw new Error('Values do not match');
    }
    return isMatch;
  },
};

module.exports = CryptService;
