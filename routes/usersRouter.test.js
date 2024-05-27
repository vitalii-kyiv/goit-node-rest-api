import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";
import { findUser } from "../services/usersServices.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/auth/login", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test login with correct data", async () => {
    const loginData = {
      email: "test@test.com",
      password: "111111",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(loginData.email);
    expect(body.user.email).toBe(loginData.email);
    expect(body).toHaveProperty("token");
    expect(body.user).toHaveProperty("email", expect.any(String));
    expect(body.user).toHaveProperty("subscription", expect.any(String));
  });
});
