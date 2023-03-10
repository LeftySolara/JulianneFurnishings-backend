import { ValueObject } from "@core/domain/valueObject";
import { Guard, IGuardResult } from "@core/logic/guard";
import { Result } from "@core/logic/result";

interface ProductCategoryProps {
  value: string;
}

export class ProductCategory extends ValueObject<ProductCategoryProps> {
  get value(): string {
    return this.props.value;
  }

  /* eslint-disable no-useless-constructor */
  private constructor(props: ProductCategoryProps) {
    super(props);
  }

  public static create(category: string): Result<ProductCategory> {
    const guardResult: IGuardResult = Guard.againstNullOrUndefined(
      category,
      "category",
    );

    if (!guardResult.succeeded) {
      return Result.fail<ProductCategory>(guardResult.message as string);
    }
    return Result.ok<ProductCategory>(new ProductCategory({ value: category }));
  }
}
