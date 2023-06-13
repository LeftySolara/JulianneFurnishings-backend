import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

interface HashedPasswordProps {
  value: string;
}

class HashedPassword extends ValueObject<HashedPasswordProps> {
  /* bcrypt hashes are 60 characters long */
  private static hashLength = 60;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: HashedPasswordProps) {
    super(props);
  }

  public static create(hashedPassword: string): Result<HashedPassword> {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      hashedPassword,
      "hashedPassword",
    );

    const hashedPasswordLengthResult: IGuardResult = Guard.inRange(
      hashedPassword.length,
      HashedPassword.hashLength,
      HashedPassword.hashLength,
      "hashedPassword.length",
    );

    const result = Guard.combine([
      nullOrUndefinedResult,
      hashedPasswordLengthResult,
    ]);

    if (!result.succeeded) {
      return Result.fail<HashedPassword>(result.message);
    }

    return Result.ok<HashedPassword>(
      new HashedPassword({ value: hashedPassword }),
    );
  }
}

export { HashedPassword };
