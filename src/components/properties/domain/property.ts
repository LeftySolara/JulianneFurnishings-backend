import { Entity } from "@domain/entity";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Slug } from "@domain/slug";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";
import { Name } from "@components/properties/domain/name";

interface IPropertyProps {
  name: Name;
}

/**
 * Convenience class for product properties that just have an id, slug, and name.
 */
class Property extends Entity<IPropertyProps> {
  get name(): Name {
    return this.props.name;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: IPropertyProps, id?: UniqueEntityId, slug?: Slug) {
    super(props, id, slug);
  }

  public static createProperty(
    props: IPropertyProps,
    id?: UniqueEntityId,
    slug?: Slug,
  ): Result<Property> {
    const propertyPropsCheck: IGuardResult = Guard.againstNullOrUndefined(
      props.name,
      "name",
    );

    if (!propertyPropsCheck.succeeded) {
      return Result.fail<Property>(propertyPropsCheck.message as string);
    }

    return Result.ok<Property>(new Property(props, id, slug));
  }
}

export { Property };
