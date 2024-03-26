const UserService = require("../../domain/services/UserService");

const RegisterUseCase = {
  handle: async (res, data) => {
    const { email, password } = data;

    await UserService.register({ email, password });

    return res.send(`You are user ${email} with ${password}, welcome!`);
  },
};

module.exports = RegisterUseCase;
