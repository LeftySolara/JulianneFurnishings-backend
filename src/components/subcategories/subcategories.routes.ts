import express, { Request, Response } from "express";
import { check } from "express-validator";
import { createSubcategoryController } from "@components/subcategories/useCases/createSubcategory";

const subcategoriesRouter: express.Router = express.Router();

subcategoriesRouter.post(
  "/",
  [check("name").notEmpty().isLength({ max: 256 })],
  async (req: Request, res: Response) => {
    await createSubcategoryController.execute(req, res);
  },
);

export { subcategoriesRouter };
