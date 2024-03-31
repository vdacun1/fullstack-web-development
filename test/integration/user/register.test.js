const request = require("supertest");

const app = require("@src/app");

describe("POST /user/register", () => {
  test("Should create the user successfully", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user@gmail.com",
      password: "password",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.message).toBe(
      "User registered successfully: user@gmail.com",
    );
  });

  test("Should not create user due to conflict", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user@gmail.com",
      password: "password",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });

  test("Should not create user due to conflict whit normalized email", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user+123456@gmail.com",
      password: "password",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });

  test("Should not create user due to validation - Without email", async () => {
    const response = await request(app).post("/user/register").send({
      password: "password",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.errors.email).toBe("Invalid value");
  });

  test("Should not create user due to validation - Without email", async () => {
    const response = await request(app).post("/user/register").send({
      email: "user+123456@gmail.com",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.errors.password).toBe("Invalid value");
  });
});
