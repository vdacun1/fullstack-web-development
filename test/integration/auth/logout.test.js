const request = require("supertest");

const app = require("@src/app");

describe("POST /auth/logout", () => {
  test("Should logout successfully", async () => {
    const response = await request(app).post("/auth/logout");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Logout");
  });
});
