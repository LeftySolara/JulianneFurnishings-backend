import request from "supertest";
import testHelpers from "@utils/testHelpers";
import app from "app";

describe("The routes at /categories", () => {
  testHelpers.routeTestInit(app);

  describe("the endpoint /categories", () => {
    const endpoint = "/categories";
    const errorMessage = { message: String };

    // TODO: clear database after each test
    describe("for GET requests", () => {
      it("should return 404 and an error message if no product categories are found", async () => {
        const response: request.Response = await request(app).get(endpoint);

        expect(response.statusCode).toBe(404);
        expect(response.body).toMatchObject(errorMessage);
      });

      it("should return 200 and an array of product category objects if any exist", async () => {
        // TODO: add one category to test database
        const response: request.Response = await request(app).get(endpoint);

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([
          {
            self: String,
            uuid: String,
            slug: String,
            createdAt: String,
            updatedAt: String,
            deletedAt: String,
            name: String,
          },
        ]);
      });
    });

    describe("for POST requests", () => {
      const validPostBody = { name: "Test" };

      it("should return 201 and the newly-created category object", async () => {
        const response: request.Response = await request(app)
          .post(endpoint)
          .send(validPostBody)
          .set("Accept", "application/json")
          .set("Cookie", ["role=admin"])
          .expect("Content-Type", /json/)
          .expect(201);

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({
          self: String,
          uuid: String,
          slug: String,
          createdAt: String,
          updatedAt: String,
          deletedAt: String,
          name: String,
        });
      });

      it("should return 400 and an error message if the request is malformed", async () => {
        const response: request.Response = await request(app)
          .post(endpoint)
          .send({ hello: 1 })
          .set("Accept", "application/json")
          .set("Cookie", ["role=admin"])
          .expect("Content-Type", /json/)
          .expect(400);

        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject(errorMessage);
      });

      it("should return 401 and an error message if the requestor's credentials are invalid", async () => {
        const response: request.Response = await request(app)
          .post(endpoint)
          .send(validPostBody)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(401);

        expect(response.statusCode).toBe(401);
        expect(response.body).toMatchObject(errorMessage);
      });

      it("should return 403 and an error message if the requestor has valid credentials but does not have sufficient permissions", async () => {
        const response: request.Response = await request(app)
          .post(endpoint)
          .send(validPostBody)
          .set("Accept", "application/json")
          .set("Cookie", ["role=user"])
          .expect("Content-Type", /json/)
          .expect(403);

        expect(response.statusCode).toBe(403);
        expect(response.body).toMatchObject(errorMessage);
      });
    });
  });

  describe("the endpoint /categories/{slug}", () => {});
});
