const request = require("supertest");

const app = require("@src/app");

describe("POST /user/confirm-email", () => {
  test("Should return confirm email", async () => {
    const response = await request(app).post("/user/confirm-email");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Confirm email");
  });
});
