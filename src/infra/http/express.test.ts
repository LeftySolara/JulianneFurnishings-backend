import request from "supertest";
import testHelpers from "@utils/testHelpers";
import { commonHttpErrors } from "@utils/errors";
import app from "./app";

describe("Testing the route /", () => {
  testHelpers.routeTestInit(app);

  describe("For GET requests", () => {
    it("Should return 'Hello World!", async () => {
      const response: request.Response = await request(app).get("/");
      expect(response.statusCode).toBe(commonHttpErrors.ok);
      expect(response.body).toEqual("Hello World! This is a public endpoint!");
    });
  });
});
