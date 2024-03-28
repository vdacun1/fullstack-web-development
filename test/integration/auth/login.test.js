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

  test("Should return validation error - Email invalid value", async () => {
    const response = await request(app).post("/auth/login").send({
      password: "password",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.email).toBe("Invalid value");
  });
  test("Should return validation error - Password invalid value", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "user@email.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors.password).toBe("Invalid value");
  });
});
