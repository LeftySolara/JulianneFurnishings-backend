import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

interface SlugProps {
  value: string;
}

class Slug extends ValueObject<SlugProps> {
  private static targetLength = 16;

  /* eslint-disable-next-line no-useless-constructor */
  constructor(props?: SlugProps, uuid?: string) {
    if (!props || !props.value) {
      super({ value: Slug.generate(uuid!) });
    } else {
      super(props);
    }
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

  private static generate(uuid: string): string {
    const encodedUUID = Buffer.from(uuid).toString("base64");
    const slug = encodedUUID
      .replace("=", "")
      .replace("+", "-")
      .replace("/", "-")
      .substring(0, 16);

    return slug;
  }
}

export { Slug };
