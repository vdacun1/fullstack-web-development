const request = require("supertest");
const app = require("../../../app/app");

describe("POST /auth/register", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user@mail.com",
      password: "password",
    });

    expect(response.statusCode).toBe(200);
  });
});
