import { BaseController } from "@infra/http/baseController";
import { CreateCategoryUseCase } from "@components/categories/useCases/createCategory/createCategoryUseCase";
import {
  CategoryDTO,
  CreateCategoryDTO,
} from "@components/categories/domain/categoryDTO";
import { CreateCategoryErrors } from "@components/categories/useCases/createCategory/createCategoryErrors";

class CreateCategoryController extends BaseController {
  private useCase: CreateCategoryUseCase;

  constructor(useCase: CreateCategoryUseCase) {
    super();
    this.useCase = useCase;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  protected async executeImpl(): Promise<any> {
    if (!this.req || !this.res) {
      throw new Error("Missing request or response object.");
    }

    const dto: CreateCategoryDTO = this.req.body as CreateCategoryDTO;
    let result;

    try {
      result = await this.useCase.execute(dto);
    } catch (err) {
      return this.fail(err as Error);
    }

    if (result.isRight()) {
      return this.ok<CategoryDTO>(this.res, result.value.getValue());
    }

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CreateCategoryErrors.InvalidNameLength:
          return this.badRequest(
            (error as CreateCategoryErrors.InvalidNameLength).errorValue()
              .message,
          );
        default:
          return this.fail(error.errorValue());
      }
    }

    return this.fail("Unknown error.");
  }
}

export { CreateCategoryController };
