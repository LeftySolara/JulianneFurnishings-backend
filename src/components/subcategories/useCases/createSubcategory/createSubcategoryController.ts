import { BaseController } from "@infra/http/baseController";
import { CreateSubcategoryUseCase } from "@components/subcategories/useCases/createSubcategory/createSubcategoryUseCase";
import {
  CreateSubcategoryDTO,
  SubcategoryDTO,
} from "@components/subcategories/domain/subcategoryDTO";
import { CreateSubcategoryErrors } from "@components/subcategories/useCases/createSubcategory/createSubcategoryErrors";

class CreateSubCategoryController extends BaseController {
  private useCase: CreateSubcategoryUseCase;

  constructor(useCase: CreateSubcategoryUseCase) {
    super();
    this.useCase = useCase;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  protected async executeImpl(): Promise<any> {
    if (!this.req || !this.res) {
      throw new Error("Missing request or response object.");
    }

    const dto: CreateSubcategoryDTO = this.req.body as CreateSubcategoryDTO;
    let result;

    try {
      result = await this.useCase.execute(dto);
    } catch (err) {
      return this.fail(err as Error);
    }

    if (result.isRight()) {
      return this.ok<SubcategoryDTO>(this.res, result.value.getValue());
    }

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CreateSubcategoryErrors.InvalidNameLength:
          return this.badRequest(
            (error as CreateSubcategoryErrors.InvalidNameLength).errorValue()
              .message,
          );
        default:
          return this.fail(error.errorValue());
      }
    }

    return this.fail("Unknown error.");
  }
}

export { CreateSubCategoryController };
