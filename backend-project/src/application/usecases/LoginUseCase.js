const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const LoginUseCase = (loginRequest) => {
  if (loginRequest.username === "admin" && loginRequest.password === "admin") {
    return {
      status: 200,
      message: "Login success",
      data: {
        token: jwt.sign({ username: loginRequest.username }, JWT_SECRET_KEY, {
          expiresIn: "1h",
        }),
      },
    };
  }
};

module.exports = LoginUseCase;
