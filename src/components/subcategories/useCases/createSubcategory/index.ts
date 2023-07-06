import { subcategoryRepo } from "@components/subcategories/subcategories.repository";
import { CreateSubcategoryUseCase } from "@components/subcategories/useCases/createSubcategory/createSubcategoryUseCase";
import { CreateSubCategoryController } from "@components/subcategories/useCases/createSubcategory/createSubcategoryController";

const createSubcategoryUseCase = new CreateSubcategoryUseCase(subcategoryRepo);
const createSubcategoryController = new CreateSubCategoryController(
  createSubcategoryUseCase,
);

export { createSubcategoryUseCase, createSubcategoryController };
