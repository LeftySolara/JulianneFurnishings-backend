import { UseCaseError } from "@domain/useCaseError";
import { Result } from "@utils/result";

export namespace CreateSubcategoryErrors {
  export class InvalidNameLength extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Subcategory name must be less than 256 characters.",
      } as UseCaseError);
    }
  }
}
