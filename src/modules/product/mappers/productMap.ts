import { Product } from "@modules/product/domain/product";
import { ProductRoom } from "@modules/product/domain/productRoom";
import { ProductBrand } from "@modules/product/domain/productBrand";
import { ProductColor } from "@modules/product/domain/productColor";
import { ProductCategory } from "@modules/product/domain/productCategory";
import { ProductSubCategory } from "@modules/product/domain/productSubCategory";
import logger from "@utils/logger";

export class ProductMap {
  public static toDomain(raw: any): Product | null {
    const productOrError = Product.create(
      {
        slug: raw.slug,
        name: raw.name,
        description: raw.description,
        unitPrice: raw.unitPrice,
        room: ProductRoom.create(raw.room).getValue(),
        brand: ProductBrand.create(raw.brand).getValue(),
        color: ProductColor.create(raw.color).getValue(),
        category: ProductCategory.create(raw.category).getValue(),
        subCategory: ProductSubCategory.create(raw.subCategory).getValue(),
        imageUrl: raw.imageUrl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id || undefined,
    );

    if (productOrError.isFailure) {
      logger.error(productOrError);
    }

    return productOrError.isSuccess ? productOrError.getValue() : null;
  }

  public static toPersistence(product: Product): any {
    return {
      slug: product.slug,
      name: product.name,
      description: product.description,
      unitPrice: product.unitPrice.value,
      room: product.room.value,
      brand: product.brand.value,
      color: product.color.value,
      category: product.category.value,
      subCategory: product.subCategory.value,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
    };
  }
}
