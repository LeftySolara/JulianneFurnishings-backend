import { categoryRepo } from "@components/categories/categories.repository";
import { CreateCategoryUseCase } from "./createCategoryUseCase";
import { CreateCategoryController } from "./createCategoryController";

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

export { createCategoryUseCase, createCategoryController };
