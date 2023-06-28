import { Entity } from "@domain/entity";
import { Price } from "@components/products/domain/price";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Slug } from "@domain/slug";
import { Result } from "@utils/result";
import { Guard, IGuardResult } from "@utils/guard";

interface IProductProps {
  name: string;
  description: string;
  regularPrice: Price;
  salePrice: Price | null;
  imageURL: string | null;
  category: string;
  subcategory: string;
  room: string | null;
  brand: string;
  color: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

class Product extends Entity<IProductProps> {
  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get regularPrice(): Price {
    return this.props.regularPrice;
  }

  get salePrice(): Price | null {
    return this.props.salePrice;
  }

  get imageURL(): string | null {
    return this.props.imageURL;
  }

  get category(): string {
    return this.props.category;
  }

  get subcategory(): string {
    return this.props.subcategory;
  }

  get room(): string | null {
    return this.props.room;
  }

  get brand(): string {
    return this.props.brand;
  }

  get color(): string {
    return this.props.color;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: IProductProps, id?: UniqueEntityId, slug?: Slug) {
    super(props, id, slug);
  }

  public static createProduct(
    props: IProductProps,
    id?: UniqueEntityId,
    slug?: Slug,
  ): Result<Product> {
    const productPropsCheck: IGuardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: "name", argument: props.name },
      { argumentName: "description", argument: props.description },
      { argumentName: "regularPrice", argument: props.regularPrice },
      { argumentName: "category", argument: props.category },
      { argumentName: "subcategory", argument: props.subcategory },
      { argumentName: "brand", argument: props.brand },
      { argumentName: "color", argument: props.color },
      { argumentName: "createdAt", argument: props.createdAt },
    ]);

    if (!productPropsCheck.succeeded) {
      return Result.fail<Product>(productPropsCheck.message as string);
    }

    return Result.ok<Product>(new Product(props, id, slug));
  }
}

type ProductCollection = Product[];

export { Product, ProductCollection };
