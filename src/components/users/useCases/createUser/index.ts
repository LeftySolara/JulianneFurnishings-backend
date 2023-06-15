import { userRepo } from "@components/users/users.repository";
import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserController } from "./createUserController";

const createUserUseCase = new CreateUserUseCase(userRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
