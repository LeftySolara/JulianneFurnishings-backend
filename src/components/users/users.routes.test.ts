import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "@infra/http/app";
import { routeTestInit } from "@utils/testHelpers";

describe("Test the routes at /users", () => {
  routeTestInit(app);

  describe("The endpoint /users", () => {
    describe("For POST requests", () => {
      it("should respond with 200 and a user object", async () => {
        const firstName = "First";
        const lastName = "Last";
        const emailAddress = "example@example.com";
        const password = "HelloWorld123!";

        const requestObject = {
          firstName,
          lastName,
          emailAddress,
          password,
        };

        const response: request.Response = await request(app)
          .post("/users")
          .send(requestObject);

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
          firstName,
          lastName,
          emailAddress,
          hashedPassword: expect.any(String),
          createdAt: expect.any(String),
          slug: expect.any(String),
          uuid: expect.any(String),
        });
      });
    });
  });
});
