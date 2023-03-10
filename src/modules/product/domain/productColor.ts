import { ValueObject } from "@core/domain/valueObject";
import { Guard, IGuardResult } from "@core/logic/guard";
import { Result } from "@core/logic/result";

interface ProductColorProps {
  value: string;
}

export class ProductColor extends ValueObject<ProductColorProps> {
  get value(): string {
    return this.props.value;
  }

  /* eslint-disable no-useless-constructor */
  private constructor(props: ProductColorProps) {
    super(props);
  }

  public static create(color: string): Result<ProductColor> {
    const guardResult: IGuardResult = Guard.againstNullOrUndefined(
      color,
      "color",
    );

    if (!guardResult.succeeded) {
      return Result.fail<ProductColor>(guardResult.message as string);
    }
    return Result.ok<ProductColor>(new ProductColor({ value: color }));
  }
}
