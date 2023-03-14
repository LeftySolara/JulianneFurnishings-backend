import express from "express";
import { check } from "express-validator";
import { createProductController } from "@modules/product/useCases/createProduct";

const productRouter = express.Router();

productRouter.post(
  "/",
  [
    check("name").notEmpty(),
    check("description").notEmpty(),
    check("unitPrice").isNumeric(),
    check("image").notEmpty(),
    check("category").notEmpty(),
    check("subCategory").notEmpty(),
    check("room").notEmpty(),
    check("color").notEmpty(),
    check("brand").notEmpty(),
  ],
  (req: express.Request, res: express.Response) =>
    createProductController.execute(req, res),
);

export { productRouter };
