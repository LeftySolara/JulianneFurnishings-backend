import { Product as ProductModel } from "@prisma/client";
import prisma from "@infra/database/database";
import { Repo } from "@core/infra/repo.types";
import { Product } from "@modules/product/domain/product";
import { ProductMap } from "@modules/product/mappers/productMap";
import logger from "@utils/logger";

export interface IProductRepo extends Repo<Product> {
  getProductByUuid(uuid: string): Promise<Product | null>;
}

/* eslint-disable class-methods-use-this */
export class ProductRepo implements IProductRepo {
  public async getProductByUuid(uuid: string): Promise<Product | null> {
    const product: ProductModel | null = await prisma.product.findUnique({
      where: { Uuid: uuid },
    });
    return ProductMap.toDomain(product);
  }

  public async exists(uuid: string): Promise<boolean> {
    const product: ProductModel | null = await prisma.product.findUnique({
      where: { Uuid: uuid },
    });
    return !!product === true;
  }

  private generateSlug(uuid: string): string {
    const encodedUUID = Buffer.from(uuid).toString("base64");
    const slug = encodedUUID
      .replace("=", "")
      .replace("+", "-")
      .replace("/", "-")
      .substring(0, 16);

    return slug;
  }

  public async save(product: Product): Promise<Product | null> {
    const rawProduct = ProductMap.toPersistence(product);
    const productExists: boolean = await this.exists(product.id);
    let savedProduct;

    try {
      if (!productExists) {
        const slug = this.generateSlug(product.id);
        const createdAt = new Date();

        savedProduct = await prisma.product.create({
          ...rawProduct,
          slug,
          createdAt,
        });
      } else {
        const updatedAt = new Date();

        savedProduct = prisma.product.update({
          where: { Uuid: product.id },
          data: { ...rawProduct, updatedAt },
        });
      }
    } catch (err) {
      this.rollbackSave(product);
    }

    return ProductMap.toDomain(savedProduct);
  }

  private async rollbackSave(product: Product): Promise<void> {
    logger.error(`Failed to save product with UUID ${product.id}`);
    /* TODO: Implement me! */
  }
}
