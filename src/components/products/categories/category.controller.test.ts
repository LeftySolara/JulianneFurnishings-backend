/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryController from "./category.controller";
import CategoryRepository from "./category.repository";
import CategoryService from "./category.service";
import ICategory from "./category.types";

jest.mock("./category.service");

const MockedCategoryService = CategoryService as jest.Mock<CategoryService>;

const mockedGetAll = jest.fn();

beforeAll(() => {
  MockedCategoryService.mockImplementation(() => {
    return {
      repository: undefined,
      getAll: mockedGetAll,
    };
  });
});

describe("The category controller", () => {
  const mockCategory = {
    self: expect.any(String),
    uuid: expect.any(String),
    slug: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    deletedAt: expect.any(Date),
    name: expect.any(String),
  };

  const errorMessage = expect.objectContaining({
    message: expect.any(String),
  });

  describe("getAllCategories", () => {
    it("should return 200 and an array of categories", async () => {
      const repository = new CategoryRepository();
      const service = new MockedCategoryService(repository);
      const controller = new CategoryController(service);

      const category: ICategory = {
        self: "https://api.example.com/12345",
        uuid: "example",
        slug: "12345",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        name: "example",
      };

      const req = {} as unknown;

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown;

      mockedGetAll.mockResolvedValueOnce([category]);

      await controller.getAllCategories(
        req as Request,
        mockResponse as Response,
        jest.fn(),
      );

      const mRes = mockResponse as Response;
      expect(mRes.status).toBeCalledWith(200);
      expect((mRes.json as any).mock.calls[0][0]).toEqual([mockCategory]);
    });

    it("should return 404 and an error message if no categories are found", async () => {
      const repository = new CategoryRepository();
      const service = new MockedCategoryService(repository);
      const controller = new CategoryController(service);

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown;

      const req = {} as unknown;

      mockedGetAll.mockResolvedValueOnce([]);

      await controller.getAllCategories(
        req as Request,
        mockResponse as Response,
        jest.fn(),
      );

      const mRes = mockResponse as Response;
      expect(mRes.status).toBeCalledWith(404);
      expect((mRes.json as any).mock.calls[0][0]).toEqual(errorMessage);
    });
  });
  /*
  describe("createCategory", () => {
    it("should return 201 and the newly-created category", async () => {
      const req = {
        body: {
          name: "Test",
        },
        cookies: {
          role: "admin",
        },
      } as unknown;

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown;

      await controller.createCategory(
        req as Request,
        mockResponse as Response,
        jest.fn(),
      );

      const mRes = mockResponse as Response;
      expect(mRes.status).toBeCalledWith(201);
      expect((mRes.json as any).mock.calls[0][0]).toEqual(mockCategory);
    });

    it("should return 401 and an error message if credentials are invalid or missing", async () => {
      const req = {
        body: {
          name: "Test",
        },
      } as unknown;

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown;

      await controller.createCategory(
        req as Request,
        mockResponse as Response,
        jest.fn(),
      );

      const mRes = mockResponse as Response;
      expect(mRes.status).toBeCalledWith(401);
      expect((mRes.json as any).mock.calls[0][0].toEqual(errorMessage));
    });

    it("should return 403 and an error message if a logged-in user does not have sufficient permissions", async () => {
      const req = {
        body: {
          name: "Test",
        },
        cookies: {
          role: "admin",
        },
      } as unknown;

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown;

      await controller.createCategory(
        req as Response,
        mockResponse as Response,
        jest.fn(),
      );

      const mRes = mockResponse as Response;
      expect(mRes.status).toBeCalledWith(403);
      expect((mRes.json as any).mock.calls[0][0].toEqual(errorMessage));
    });
  });
  */
});
