import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

interface SlugProps {
  value: string;
}

class Slug extends ValueObject<SlugProps> {
  private static targetLength = 22;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: SlugProps) {
    super(props);
  }

  public static create(slug: string): Result<Slug> {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      slug,
      "slug",
    );
    if (!nullOrUndefinedResult.succeeded) {
      return Result.fail<Slug>(nullOrUndefinedResult.message);
    }

    if (slug.length !== Slug.targetLength) {
      return Result.fail<Slug>("Invalid slug length.");
    }

    return Result.ok<Slug>(new Slug({ value: slug }));
  }
}

export { Slug };
