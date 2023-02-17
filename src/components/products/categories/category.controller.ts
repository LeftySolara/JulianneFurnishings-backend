import { Request, Response, NextFunction } from "express";
import { commonHttpErrors } from "@utils/errors";
import CategoryService from "./category.service";
import ICategory from "./category.types";

class CategoryController {
  public readonly service: CategoryService;

  constructor(service: CategoryService) {
    this.service = service;
  }

  /**
   * Get an array of all product categories.
   *
   * @returns An array of categories in JSON format.
   */
  getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    let categories: ICategory[] = [];

    try {
      categories = await this.service.getAll();

      if (categories.length === 0) {
        return res
          .status(commonHttpErrors.notFound)
          .json({ message: "No categories were found." });
      }
    } catch (err) {
      next(err);
    }

    return res.status(commonHttpErrors.ok).json(categories);
  };
}

export default CategoryController;
