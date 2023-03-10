import { ValueObject } from "@core/domain/valueObject";
import { Guard, IGuardResult } from "@core/logic/guard";
import { Result } from "@core/logic/result";

interface ProductSubCategoryProps {
  value: string;
}

export class ProductSubCategory extends ValueObject<ProductSubCategoryProps> {
  get value(): string {
    return this.props.value;
  }

  /* eslint-disable no-useless-constructor */
  private constructor(props: ProductSubCategoryProps) {
    super(props);
  }

  public static create(subCategory: string): Result<ProductSubCategory> {
    const guardResult: IGuardResult = Guard.againstNullOrUndefined(
      subCategory,
      "subCategory",
    );

    if (!guardResult.succeeded) {
      return Result.fail<ProductSubCategory>(guardResult.message as string);
    }
    return Result.ok<ProductSubCategory>(
      new ProductSubCategory({ value: subCategory }),
    );
  }
}
