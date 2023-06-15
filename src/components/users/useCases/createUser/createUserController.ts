import { BaseController } from "@infra/http/baseController";
import { CreateUserUseCase } from "@components/users/useCases/createUser/createUserUseCase";
import { CreateUserDTO, UserDTO } from "@components/users/domain/userDTO";
import { CreateUserErrors } from "@components/users/useCases/createUser/createUserErrors";

class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async executeImpl(): Promise<any> {
    if (!this.req || !this.res) {
      throw new Error("Missing request or response object.");
    }

    const dto: CreateUserDTO = this.req.body as CreateUserDTO;
    let result;

    try {
      result = await this.useCase.execute(dto);
    } catch (err) {
      return this.fail(err as Error);
    }

    if (result.isRight()) {
      return this.ok<UserDTO>(this.res, result.value.getValue());
    }

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CreateUserErrors.EmailAddressInUse:
          return this.badRequest(
            (error as CreateUserErrors.EmailAddressInUse).errorValue().message,
          );
        default:
          return this.fail(error.errorValue());
      }
    }

    return this.fail("Unknown error");
  }
}

export { CreateUserController };
