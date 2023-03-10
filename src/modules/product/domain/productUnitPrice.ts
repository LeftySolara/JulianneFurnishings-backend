import { ValueObject } from "@core/domain/valueObject";
import { Result } from "@core/logic/result";
import { Guard } from "@core/logic/guard";

interface ProductUnitPriceProps {
  value: number;
}

export class ProductUnitPrice extends ValueObject<ProductUnitPriceProps> {
  get value(): number {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: ProductUnitPriceProps) {
    super(props);
  }

  public static create(unitPrice: number): Result<ProductUnitPrice> {
    const guardResult = Guard.isNonNegative(unitPrice, "unitPrice");
    if (!guardResult.succeeded) {
      return Result.fail<ProductUnitPrice>(guardResult.message as string);
    }
    return Result.ok<ProductUnitPrice>(
      new ProductUnitPrice({ value: unitPrice }),
    );
  }
}
