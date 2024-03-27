const request = require("supertest");
const app = require("../../../src/app");

describe("POST /user/register", () => {
  test("Should create the user successfully", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user@gmail.com",
      password: "password",
    });

    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  test("Should not create user due to conflict", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user+123@gmail.com",
      password: "password",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });
});
