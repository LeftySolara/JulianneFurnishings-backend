/* eslint-disable @typescript-eslint/no-explicit-any */
import controller from "./category.controller";

describe("The category controller", () => {
  const emptyReq = {};

  const mockCategory = {
    self: expect.any(String),
    uuid: expect.any(String),
    slug: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    deletedAt: expect.any(String),
    name: expect.any(String),
  };

  const errorMessage = expect.objectContaining({
    message: expect.any(String),
  });

  describe("getAllCategories", () => {
    it("should return 200 and an array of categories", async () => {
      // TODO: generate a category for this to fetch
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown;

      await controller.getAllCategories(
        emptyReq as Request,
        mockResponse as Response,
        jest.fn(),
      );

      const mRes = mockResponse as Response;
      expect(mRes.status).toBeCalledWith(200);
      expect((mRes.json as any).mock.calls[0][0]).toEqual([mockCategory]);
    });

    it("should return 404 and an error message if no categories are found", async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown;

      await controller.getAllCategories(
        emptyReq as Request,
        mockResponse as Response,
        jest.fn(),
      );

      const mRes = mockResponse as Response;
      expect(mRes.status).toBeCalledWith(404);
      expect((mRes.json as any).mock.calls[0][0]).toEqual(errorMessage);
    });
  });

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
});
