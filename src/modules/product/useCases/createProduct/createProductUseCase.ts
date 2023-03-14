import { Either, left, right, Result } from "@core/logic/result";
import { Errors } from "@core/logic/appError";
import { ErrorHandler } from "@core/logic/errorHandler";
import { UseCase } from "@core/domain/useCase";
import { IProductRepo } from "@modules/product/repos/productRepo";
import { Product } from "@modules/product/domain/product";
import { ProductUnitPrice } from "@modules/product/domain/productUnitPrice";
import { ProductCategory } from "@modules/product/domain/productCategory";
import { ProductSubCategory } from "@modules/product/domain/productSubCategory";
import { ProductRoom } from "@modules/product/domain/productRoom";
import { ProductBrand } from "@modules/product/domain/productBrand";
import { ProductColor } from "@modules/product/domain/productColor";
import { CreateProductDTO } from "./createProductDTO";

/* eslint-disable @typescript-eslint/indent */
type Response = Either<Errors.AppError, Result<any>>;

export class CreateProductUseCase
  implements UseCase<CreateProductDTO, Promise<Response>>
{
  private productRepo: IProductRepo;

  constructor(productRepo: IProductRepo) {
    this.productRepo = productRepo;
  }

  async execute(req: CreateProductDTO): Promise<Response> {
    const productOrError = Product.create({
      name: req.name,
      description: req.description,
      unitPrice: ProductUnitPrice.create(req.unitPrice).getValue(),
      imageUrl: req.imageUrl,
      category: ProductCategory.create(req.category).getValue(),
      subCategory: ProductSubCategory.create(req.subCategory).getValue(),
      room: ProductRoom.create(req.room).getValue(),
      brand: ProductBrand.create(req.brand).getValue(),
      color: ProductColor.create(req.color).getValue(),
      createdAt: new Date(),
    });

    if (productOrError.isFailure) {
      return left(
        new Errors.AppError(
          Errors.commonErrorNames.entityCreationError,
          "Failed to create product entity.",
          true,
        ),
      );
    }

    const product = productOrError.getValue();

    try {
      await this.productRepo.save(product);
    } catch (err) {
      ErrorHandler.handleError(err as Error);
    }

    return right(Result.ok<Product>(product));
  }
}
