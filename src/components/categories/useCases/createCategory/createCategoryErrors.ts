import { UseCaseError } from "@domain/useCaseError";
import { Result } from "@utils/result";

export namespace CreateCategoryErrors {
  export class InvalidNameLength extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Category name must be less than 256 characters.",
      } as UseCaseError);
    }
  }
}
