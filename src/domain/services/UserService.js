const UserRepository = require('../repositories/UserRepository');

const UserService = {
  register: async ({
    email,
    password,
    email_verified,
    email_verification_code,
  }) => {
    const userRepository = UserRepository();
    return await userRepository.create({
      email,
      password,
      email_verified,
      email_verification_code,
    });
  },

  getEmailVerificationCodeByUserId: async (id) => {
    const userRepository = UserRepository();
    return userRepository.getEmailVerificationCodeByUserId(id);
  },

  verifyEmail: async (id) => {
    const userRepository = UserRepository();
    return userRepository.findOneAndUpdate(
      { _id: id },
      { email_verified: true },
    );
  },

  getUserByEmail: async (email) => {
    const userRepository = UserRepository();
    return userRepository.getPasswordByEmail(email);
  },

  getUser: async (id) => {
    const userRepository = UserRepository();
    return userRepository.findById(id);
  },
};

module.exports = UserService;
