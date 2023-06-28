import { Product } from "@components/products/domain/product";
import { ProductDTO } from "@components/products/domain/productDTO";
import { Price } from "@components/products/domain/price";
import { Slug } from "@domain/slug";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Result } from "@utils/result";

interface RawProductProps {
  productId: number;
  uuid: string;
  slug: string | null;
  name: string;
  description: string;
  regularPrice: number;
  salePrice: number | null;
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

class ProductMap {
  public static toDTO(product: Product): ProductDTO {
    return {
      uuid: product.uuid.props.value,
      slug: product.entitySlug.props.value,
      name: product.name,
      description: product.description,
      regularPrice: product.regularPrice.value,
      salePrice: product.salePrice ? product.salePrice.value : null,
      imageURL: product.imageURL,
      category: product.category,
      subcategory: product.subcategory,
      room: product.room,
      brand: product.brand,
      color: product.color,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
    };
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public static toPersistence(product: Product): any {
    return {
      uuid: product.uuid.props.value,
      slug: product.entitySlug.props.value,
      name: product.name,
      description: product.description,
      regularPrice: product.regularPrice.value,
      salePrice: product.salePrice ? product.salePrice.value : null,
      imageURL: product.imageURL,
      category: product.category,
      subcategory: product.subcategory,
      room: product.room,
      brand: product.brand,
      color: product.color,
      deletedAt: product.deletedAt,
    };
  }

  public static toDomain(raw: RawProductProps): Product {
    const uuid = new UniqueEntityId({ value: raw.uuid });
    const slug = new Slug(
      raw.slug ? { value: raw.slug } : undefined,
      uuid.props.value,
    );
    const regularPrice = Price.create(raw.regularPrice);
    const salePrice = raw.salePrice ? Price.create(raw.salePrice) : null;
    const {
      name,
      description,
      imageURL,
      category,
      subcategory,
      room,
      brand,
      color,
      createdAt,
      updatedAt,
      deletedAt,
    } = raw;

    let valueObjects;
    if (salePrice) {
      valueObjects = [regularPrice, salePrice];
    } else {
      valueObjects = [regularPrice];
    }

    const valueObjectCheck = Result.combine(valueObjects);
    if (valueObjectCheck.isFailure) {
      throw new Error(valueObjectCheck.errorValue.toString());
    }

    const createProductResult = Product.createProduct(
      {
        name,
        description,
        regularPrice: regularPrice.getValue(),
        salePrice: salePrice ? salePrice.getValue() : null,
        imageURL,
        category,
        subcategory,
        room,
        brand,
        color,
        createdAt,
        updatedAt: updatedAt ?? null,
        deletedAt: deletedAt ?? null,
      },
      uuid,
      slug,
    );

    if (createProductResult.isFailure) {
      throw new Error(createProductResult.error?.toString());
    }

    return createProductResult.getValue();
  }
}

export { ProductMap };
