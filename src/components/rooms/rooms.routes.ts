import express, { Request, Response } from "express";
import { check } from "express-validator";
import { createRoomController } from "@components/rooms/useCases/createRoom";

const roomsRouter: express.Router = express.Router();

roomsRouter.post(
  "/",
  [check("name").notEmpty().isLength({ max: 256 })],
  async (req: Request, res: Response) => {
    await createRoomController.execute(req, res);
  },
);

export { roomsRouter };
