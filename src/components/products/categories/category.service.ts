import { Category } from "@prisma/client";
import urlcat from "urlcat";
import { appConfig } from "@utils/appConfig";
import CategoryRepository from "./category.repository";
import ICategory from "./category.types";
import { AppError, commonErrorNames, commonHttpErrors } from "@utils/errors";

class CategoryService {
  private readonly repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  /**
   * Get an array of all product categories.
   */
  public async getAll(): Promise<ICategory[]> {
    let fetchedCategories: Category[];
    let categories: ICategory[] = [];

    try {
      fetchedCategories = await this.repository.getAll();

      categories = fetchedCategories.map((category: Category): ICategory => {
        const url = urlcat(
          appConfig.express.baseUrl as string,
          "/categories/:slug",
          {
            slug: category.Slug,
          },
        );

        return {
          self: url,
          uuid: category.Uuid,
          slug: category.Slug,
          createdAt: category.CreatedAt,
          updatedAt: category.UpdatedAt,
          deletedAt: category.DeletedAt,
          name: category.Name,
        } as ICategory;
      });
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      } else if (err instanceof Error) {
        throw new AppError(
          commonErrorNames.internalServerError,
          commonHttpErrors.internalServerError,
          err.message,
          true,
        );
      }
    }

    return categories;
  }
}

export default CategoryService;
