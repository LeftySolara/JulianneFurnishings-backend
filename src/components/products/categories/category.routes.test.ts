import request from "supertest";
import express from "express";
import app from "app";
import loadExpress from "@loaders/express";
import CategoryController from "./category.controller";
import CategoryService from "./category.service";
import CategoryRepository from "./category.repository";

jest.mock("./category.controller");

const MockedCategoryController =
  CategoryController as jest.Mock<CategoryController>;

const mockedGetAllCategories = jest.fn();

beforeAll(async () => {
  MockedCategoryController.mockImplementation(() => {
    return {
      service: new CategoryService(new CategoryRepository()),
      getAllCategories: mockedGetAllCategories,
    };
  });

  const mockedController = new MockedCategoryController();

  await loadExpress({
    app,
    controllers: { categoryController: mockedController },
  });
});

describe("The routes at /categories", () => {
  describe("the endpoint /categories", () => {
    const endpoint = "/categories";

    const errorMessage = expect.objectContaining({
      message: expect.any(String),
    });

    /*
    describe("for GET requests", () => {
      it("should return 404 and an error message if no product categories are found", async () => {
        const { response } = express;

        mockedGetAllCategories.mockResolvedValueOnce(() => {
          return response.status(200).json([]);
        });

        const res = await request(app).get(endpoint);
        expect(res.statusCode).toBe(404);
        expect(res.body).toMatchObject(errorMessage);
      });

      it("should return 200 and an array of product category objects if any exist", async () => {
        const response: request.Response = await request(app).get(endpoint);

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([
          {
            self: expect.any(String),
            uuid: expect.any(String),
            slug: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            deletedAt: expect.any(String),
            name: expect.any(String),
          },
        ]);
      });
    });
    */
    /*
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
          self: expect.any(String),
          uuid: expect.any(String),
          slug: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          deletedAt: expect.any(String),
          name: expect.any(String),
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
    */
  });
});
