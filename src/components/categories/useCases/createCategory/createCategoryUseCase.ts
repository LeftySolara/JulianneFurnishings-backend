import { Either, Result, left, right } from "@utils/result";
import { UseCase } from "@domain/useCase";
import { ICategoryRepo } from "@components/categories/categories.repository";
import { Name } from "@components/properties/domain/name";
import { Category } from "@components/categories/domain/category";
import { CategoryDTO } from "@components/categories/domain/categoryDTO";
import { CategoryMap } from "@components/categories/categories.map";
import { CreateCategoryErrors } from "./createCategoryErrors";

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/indent */
type Response = Either<
  CreateCategoryErrors.InvalidNameLength | Result<any>,
  Result<CategoryDTO>
>;

class CreateCategoryUseCase implements UseCase<CategoryDTO, Promise<Response>> {
  private repo: ICategoryRepo;

  constructor(categoryRepo: ICategoryRepo) {
    this.repo = categoryRepo;
  }

  async execute(request: CategoryDTO): Promise<Response> {
    const nameResult = Name.create(request.name);
    if (nameResult.isFailure) {
      return left(Result.fail<void>(nameResult.error)) as Response;
    }

    const categoryOrError = Category.create({
      name: nameResult.getValue(),
    });

    if (categoryOrError.isFailure) {
      return left(Result.fail<void>(categoryOrError.error)) as Response;
    }

    const category: Category = categoryOrError.getValue();

    try {
      await this.repo.save(category);
    } catch (err: unknown) {
      return left(Result.fail<void>((err as Error).stack));
    }

    return right(
      Result.ok<CategoryDTO>(CategoryMap.toDTO(category)),
    ) as Response;
  }
}

export { CreateCategoryUseCase };
