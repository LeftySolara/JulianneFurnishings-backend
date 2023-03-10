import { ValueObject } from "@core/domain/valueObject";
import { Guard, IGuardResult } from "@core/logic/guard";
import { Result } from "@core/logic/result";

interface ProductRoomProps {
  value: string;
}

export class ProductRoom extends ValueObject<ProductRoomProps> {
  get value(): string {
    return this.props.value;
  }

  /* eslint-disable no-useless-constructor */
  private constructor(props: ProductRoomProps) {
    super(props);
  }

  public static create(roomName: string): Result<ProductRoom> {
    const guardResult: IGuardResult = Guard.againstNullOrUndefined(
      roomName,
      "room",
    );

    if (!guardResult.succeeded) {
      return Result.fail<ProductRoom>(guardResult.message as string);
    }
    return Result.ok<ProductRoom>(new ProductRoom({ value: roomName }));
  }
}
