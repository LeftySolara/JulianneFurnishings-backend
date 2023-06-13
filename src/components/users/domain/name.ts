import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

interface NameProps {
  value: string;
}

class Name extends ValueObject<NameProps> {
  private static maxLength = 45;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: NameProps) {
    super(props);
  }

  public static create(name: string): Result<Name> {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      name,
      "name",
    );
    if (!nullOrUndefinedResult.succeeded) {
      return Result.fail<Name>(nullOrUndefinedResult.message);
    }

    if (name.length > Name.maxLength) {
      return Result.fail<Name>("Invalid name length.");
    }

    return Result.ok<Name>(new Name({ value: name }));
  }
}

export { Name };
