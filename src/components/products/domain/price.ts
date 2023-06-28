import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

interface PriceProps {
  value: number;
}

class Price extends ValueObject<PriceProps> {
  get value(): number {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: PriceProps) {
    super(props);
  }

  public static create(price: number): Result<Price> {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      price,
      "price",
    );
    if (!nullOrUndefinedResult.succeeded) {
      return Result.fail<Price>(nullOrUndefinedResult.message);
    }

    if (price < 0) {
      return Result.fail<Price>("Price cannot be less than 0.");
    }

    return Result.ok<Price>(new Price({ value: price }));
  }
}

export { Price };
