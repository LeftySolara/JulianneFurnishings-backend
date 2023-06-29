import express, { Request, Response } from "express";
import { check } from "express-validator";
import { createCategoryController } from "@components/categories/useCases/createCategory";

const categoriesRouter: express.Router = express.Router();

categoriesRouter.post(
  "/",
  [check("name").notEmpty().isLength({ max: 256 })],
  async (req: Request, res: Response) => {
    await createCategoryController.execute(req, res);
  },
);

export { categoriesRouter };
