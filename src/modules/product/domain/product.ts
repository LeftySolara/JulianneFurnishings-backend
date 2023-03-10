import { AggregateRoot } from "@core/domain/aggregateRoot";
import { Guard } from "@core/logic/guard";
import { Result } from "@core/logic/result";
import { ProductUnitPrice } from "./productUnitPrice";
import { ProductCategory } from "./productCategory";
import { ProductSubCategory } from "./productSubCategory";
import { ProductRoom } from "./productRoom";
import { ProductBrand } from "./productBrand";
import { ProductColor } from "./productColor";

interface ProductProps {
  slug?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  description: string;
  unitPrice: ProductUnitPrice;
  imageUrl: string;
  category: ProductCategory;
  subCategory: ProductSubCategory;
  room: ProductRoom;
  brand: ProductBrand;
  color: ProductColor;
}

export class Product extends AggregateRoot<ProductProps> {
  get id(): string {
    return this.uuid;
  }

  get slug(): string {
    return this.props.slug as string;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get unitPrice(): ProductUnitPrice {
    return this.props.unitPrice;
  }

  get imageUrl(): string {
    return this.props.imageUrl;
  }

  get category(): ProductCategory {
    return this.props.category;
  }

  get subCategory(): ProductSubCategory {
    return this.props.subCategory;
  }

  get room(): ProductRoom {
    return this.props.room;
  }

  get brand(): ProductBrand {
    return this.props.brand;
  }

  get color(): ProductColor {
    return this.props.color;
  }

  /* eslint-disable no-useless-constructor */
  private constructor(props: ProductProps, uuid?: string) {
    super(props, uuid);
  }

  public static create(props: ProductProps, uuid?: string): Result<Product> {
    const guardedProps = [
      { argument: props.unitPrice, argumentName: "unitPrice" },
      { argument: props.name, argumentName: "name" },
      { argument: props.description, argumentName: "description" },
      { argument: props.category, argumentName: "category" },
      { argument: props.subCategory, argumentName: "subCategory" },
      { argument: props.room, argumentName: "room" },
      { argument: props.brand, argumentName: "brand" },
      { argument: props.color, argumentName: "color" },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Product>(guardResult.message as string);
    }

    const product = new Product({ ...props }, uuid);

    /*
    const uuidWasProvided = !!uuid;

    if (!uuidWasProvided) {
      product.addDomainEvent(new ProductCreatedEvent(product));
    }
    */

    return Result.ok<Product>(product);
  }
}
