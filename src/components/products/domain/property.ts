import { Entity } from "@domain/entity";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Slug } from "@domain/slug";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

interface IProductPropertyProps {
  name: string;
}

/**
 * Convenience class for product properties that just have an id, slug, and name.
 */
class ProductProperty extends Entity<IProductPropertyProps> {
  get name(): string {
    return this.props.name;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(
    props: IProductPropertyProps,
    id?: UniqueEntityId,
    slug?: Slug,
  ) {
    super(props, id, slug);
  }

  public static createProductProperty(
    props: IProductPropertyProps,
    id?: UniqueEntityId,
    slug?: Slug,
  ): Result<ProductProperty> {
    const propertyPropsCheck: IGuardResult = Guard.againstNullOrUndefined(
      props.name,
      "name",
    );

    if (!propertyPropsCheck.succeeded) {
      return Result.fail<ProductProperty>(propertyPropsCheck.message as string);
    }
    if (props.name.length >= 256) {
      return Result.fail<ProductProperty>(
        "Property name must be less than 256 characters.",
      );
    }

    return Result.ok<ProductProperty>(new ProductProperty(props, id, slug));
  }
}

type ProductPropertyCollection = ProductProperty[];
type ProductCategory = ProductProperty;
type ProductSubcategory = ProductProperty;
type ProductRoom = ProductProperty;
type ProductBrand = ProductProperty;
type ProductColor = ProductProperty;

export {
  ProductProperty,
  ProductPropertyCollection,
  ProductCategory,
  ProductSubcategory,
  ProductBrand,
  ProductRoom,
  ProductColor,
};
