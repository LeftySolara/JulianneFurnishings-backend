import { roomRepo } from "@components/rooms/rooms.repository";
import { CreateRoomUseCase } from "./createRoomUseCase";
import { CreateRoomController } from "./createRoomController";

const createRoomUseCase = new CreateRoomUseCase(roomRepo);
const createRoomController = new CreateRoomController(createRoomUseCase);

export { createRoomUseCase, createRoomController };
