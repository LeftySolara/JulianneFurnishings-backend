import { BaseController } from "@infra/http/baseController";
import { CreateRoomUseCase } from "@components/rooms/useCases/createRoomUseCase";
import { RoomDTO, CreateRoomDTO } from "@components/rooms/domain/roomDTO";
import { CreateRoomErrors } from "@components/rooms/useCases/createRoomErrors";

class CreateRoomController extends BaseController {
  private useCase: CreateRoomUseCase;

  constructor(useCase: CreateRoomUseCase) {
    super();
    this.useCase = useCase;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  protected async executeImpl(): Promise<any> {
    if (!this.req || !this.res) {
      throw new Error("Missing request or response object.");
    }

    const dto: CreateRoomDTO = this.req.body as CreateRoomDTO;
    let result;

    try {
      result = await this.useCase.execute(dto);
    } catch (err) {
      return this.fail(err as Error);
    }

    if (result.isRight()) {
      return this.ok<RoomDTO>(this.res, result.value.getValue());
    }

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CreateRoomErrors.InvalidNameLength:
          return this.badRequest(
            (error as CreateRoomErrors.InvalidNameLength).errorValue().message,
          );
        default:
          return this.fail(error.errorValue());
      }
    }

    return this.fail("Unknown error.");
  }
}

export { CreateRoomController };
