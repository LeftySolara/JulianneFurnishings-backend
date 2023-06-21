import express, { Request, Response } from "express";
import { check } from "express-validator";
import { createUserController } from "@components/users/useCases/createUser";

const usersRouter: express.Router = express.Router();

usersRouter.post(
  "/",
  [
    check("emailAddress").isEmail(),
    check("firstName").notEmpty().isLength({ min: 3, max: 45 }),
    check("lastName").notEmpty().isLength({ min: 3, max: 45 }),
    check("password").isLength({ min: 8 }),
  ],
  async (req: Request, res: Response) => {
    await createUserController.execute(req, res);
  },
);

export { usersRouter };
