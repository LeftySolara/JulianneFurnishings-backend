import { prismaMock } from "@utils/testHelpers";
import CategoryRepository from "./category.repository";

describe("The category repository", () => {
  const repo = new CategoryRepository();

  describe("getAll", () => {
    it("should return a list of all categories", async () => {
      const category = {
        CategoryId: 1,
        Self: "https://api.example.com/categories/12345",
        Uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
        Slug: "er340jfr0324r2fmc09234",
        CreatedAt: new Date("2019-08-24T14:15:22Z"),
        UpdatedAt: new Date("2019-08-24T14:15:22Z"),
        DeletedAt: new Date("2019-08-24T14:15:22Z"),
        Name: "Example",
      };

      prismaMock.category.findMany.mockResolvedValue([category]);

      await expect(repo.getAll()).resolves.toEqual([category]);
    });

    it("should return an empty array if there are no categories", async () => {
      prismaMock.category.findMany.mockResolvedValue([]);
      await expect(repo.getAll()).resolves.toEqual([]);
    });
  });
});
