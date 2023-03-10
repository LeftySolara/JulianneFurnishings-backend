import { ValueObject } from "@core/domain/valueObject";
import { Guard, IGuardResult } from "@core/logic/guard";
import { Result } from "@core/logic/result";

interface ProductBrandProps {
  value: string;
}

export class ProductBrand extends ValueObject<ProductBrandProps> {
  get value(): string {
    return this.props.value;
  }

  /* eslint-disable no-useless-constructor */
  private constructor(props: ProductBrandProps) {
    super(props);
  }

  public static create(brandName: string): Result<ProductBrand> {
    const guardResult: IGuardResult = Guard.againstNullOrUndefined(
      brandName,
      "brand",
    );

    if (!guardResult.succeeded) {
      return Result.fail<ProductBrand>(guardResult.message as string);
    }
    return Result.ok<ProductBrand>(new ProductBrand({ value: brandName }));
  }
}
