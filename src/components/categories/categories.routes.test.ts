import app from "@infra/http/app";
import request from "supertest";
import { routeTestInit } from "@utils/testHelpers";
import { describe, expect, it } from "vitest";

describe("Test the routes at /categories", () => {
  routeTestInit(app);

  describe("The endpoint /categories", () => {
    const endpoint = "/categories";

    describe("For POST requests", () => {
      it("should respond with 200 and a category object", async () => {
        const categoryName = "Example";

        const requestObject = {
          name: categoryName,
        };

        const response: request.Response = await request(app)
          .post(endpoint)
          .send(requestObject);

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
          uuid: expect.any(String),
          slug: expect.any(String),
          name: categoryName,
        });
      });

      it("should respond with 422 when given a blank name", async () => {
        const requestObject = {
          name: "",
        };

        const response: request.Response = await request(app)
          .post(endpoint)
          .send(requestObject);

        expect(response.statusCode).toBe(422);
      });

      it("should respond with 422 when given a name longer than 256 characters", async () => {
        /* Generate a random category name of 257 chacrcters. */
        const categoryName = (() => {
          let result = "";
          const characters = "abcde";
          let counter = 0;
          while (counter < 257) {
            result += characters.charAt(
              Math.floor(Math.random() * characters.length),
            );
            counter += 1;
          }
          return result;
        })();

        const response: request.Response = await request(app)
          .post(endpoint)
          .send({ name: categoryName });

        expect(response.statusCode).toBe(422);
      });
    });
  });
});
