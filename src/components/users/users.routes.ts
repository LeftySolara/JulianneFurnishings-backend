import express from "express";
import { createUserController } from "@components/users/useCases/createUser";

const usersRouter: express.Router = express.Router();

usersRouter.post("/", async (req, res) => {
  await createUserController.execute(req, res);
});

export { usersRouter };
