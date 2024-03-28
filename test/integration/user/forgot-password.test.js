const request = require("supertest");

const app = require("@src/app");

describe("POST /user/forgot-password", () => {
  test("Should return forgot password", async () => {
    const response = await request(app).post("/user/forgot-password");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Forgot password");
  });
});
