/* eslint-disable class-methods-use-this  */
import prisma from "@components/database/database";
import { Category } from "@prisma/client";
import { AppError, commonErrorNames, commonHttpErrors } from "@utils/errors";

class CategoryRepository {
  /*
   * Fetch all categories.
   *
   * @return An array of category objects.
   */
  public async getAll(): Promise<Category[]> {
    let categories: Category[] = [];

    try {
      categories = await prisma.category.findMany();
      if (categories === undefined) {
        categories = [];
      }
    } catch (err) {
      if (err instanceof Error) {
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

export default CategoryRepository;
