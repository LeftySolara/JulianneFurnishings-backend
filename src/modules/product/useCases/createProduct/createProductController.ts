import { BaseController } from "@core/infra/baseController";
import { CreateProductUseCase } from "./createProductUseCase";

export class CreateProductController extends BaseController {
  private useCase: CreateProductUseCase;

  constructor(useCase: CreateProductUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(): Promise<any> {
    const {
      name,
      description,
      unitPrice,
      imageUrl,
      category,
      subCategory,
      room,
      color,
      brand,
    } = this.req.body;

    try {
      const result = await this.useCase.execute({
        name,
        description,
        unitPrice,
        imageUrl,
        category,
        subCategory,
        room,
        color,
        brand,
      });

      if (result.isLeft()) {
        const error = result.value;
        return this.fail(error.message);
      }
      return this.created(this.res);
    } catch (err) {
      return this.fail(err as Error);
    }
  }
}
