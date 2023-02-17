import express, { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { commonHttpErrors } from "@utils/errors";

const router: express.Router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(commonHttpErrors.ok).json([
    {
      self: "https://api.example.com/categories/12345",
      uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
      slug: "er340jfr0324r2fmc09234",
      createdAt: "2019-08-24T14:15:22Z",
      updatedAt: "2019-08-24T14:15:22Z",
      deletedAt: "2019-08-24T14:15:22Z",
      name: "Example",
    },
  ]);
});

router.post(
  "/",
  [check("name").isLength({ min: 1, max: 256 })],
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({
      self: "https://api.example.com/categories/12345",
      uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
      slug: "er340jfr0324r2fmc09234",
      createdAt: "2019-08-24T14:15:22Z",
      updatedAt: "2019-08-24T14:15:22Z",
      deletedAt: "2019-08-24T14:15:22Z",
      name: "Example",
    });
  },
);

export default router;
