import { productRepo } from "@modules/product/repos/productRepo";
import { CreateProductUseCase } from "./createProductUseCase";
import { CreateProductController } from "./createProductController";

const createProductCase = new CreateProductUseCase(productRepo);
const createProductController = new CreateProductController(createProductCase);

export { createProductCase, createProductController };
