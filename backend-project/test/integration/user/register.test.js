const request = require("supertest");
const app = require("../../../src/app");

describe("POST /user/register", () => {
  test("It should respond with a 200 status code", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user@mail.com",
      password: "password",
    });

    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("email");
  });

  test("It should not respond with a 200 status code", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user@mail.com",
      password: "password",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });
});
