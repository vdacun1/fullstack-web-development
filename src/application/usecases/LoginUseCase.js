const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const HttpStatus = require("../constants/HttpStatus");
const UserService = require("../../domain/services/UserService");
const CryptService = require("../../domain/services/CryptService");
const ErrorResponse = require("@src/application/responses/ErrorResponse");

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const LoginUseCase = {
  handle: async (res, data) => {
    try {
      const { email, password } = data;

      const { password: hashedPassword } =
        await UserService.getUserByEmail(email);

      await CryptService.compare(password, hashedPassword);

      const token = jwt.sign({ email: email }, JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: "Login success",
        token,
      });
    } catch (error) {
      return ErrorResponse.handleApiException(res, {
        status: HttpStatus.UNAUTHORIZED,
        message: "Wrong email or password",
      });
    }
  },
};

module.exports = LoginUseCase;
