import { Either, Result } from "@core/logic/result";
import { GenericAppError } from "@core/logic/appError";
import { UseCase } from "@core/domain/useCase";
import { CreateProductDTO } from "./createProductDTO";

/* eslint-disable @typescript-eslint/indent */
type Response = Either<
  GenericAppError.UnexpectedError | Result<any>,
  Result<void>
>;

export class CreateProductUseCase
  implements UseCase<CreateProductDTO, Promise<Response>>
{
  async execute(req: CreateProductDTO): Promise<Response> {}
}
