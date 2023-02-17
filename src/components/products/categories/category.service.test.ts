import { appConfig } from "@utils/appConfig";
import CategoryRepository from "./category.repository";
import CategoryService from "./category.service";
import ICategory from "./category.types";

jest.mock("./category.repository");

const MockedCategoryRepository =
  CategoryRepository as jest.Mock<CategoryRepository>;

const mockedGetAll = jest.fn();

beforeAll(() => {
  MockedCategoryRepository.mockImplementation(() => {
    return {
      getAll: mockedGetAll,
    };
  });
});

describe("The Category service", () => {
  describe("getAll", () => {
    it("should return an array of ICategory objects", async () => {
      const repository = new MockedCategoryRepository();
      const service = new CategoryService(repository);

      const category = {
        CategoryId: 1,
        Uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
        Slug: "12345",
        CreatedAt: new Date("2019-08-24T14:15:22Z"),
        UpdatedAt: new Date("2019-08-24T14:15:22Z"),
        DeletedAt: new Date("2019-08-24T14:15:22Z"),
        Name: "Example",
      };

      mockedGetAll.mockResolvedValueOnce([category]);
      const categories: ICategory[] = await service.getAll();

      expect(mockedGetAll).toHaveReturnedTimes(1);
      expect(categories).toMatchObject([
        {
          self: `${appConfig.express.baseUrl}/categories/${category.Slug}`,
          uuid: category.Uuid,
          slug: category.Slug,
          createdAt: category.CreatedAt,
          updatedAt: category.UpdatedAt,
          deletedAt: category.DeletedAt,
          name: category.Name,
        },
      ]);
    });
  });
});
