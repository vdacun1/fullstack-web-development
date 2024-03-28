const request = require("supertest");

const app = require("@src/app");

describe("POST /auth/login", () => {
  test("Should login successfully", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "user@email.com",
      password: "password",
    });

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Login successfully");
  });
});
