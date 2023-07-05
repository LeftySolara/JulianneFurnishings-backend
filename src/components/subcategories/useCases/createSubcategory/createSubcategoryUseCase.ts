import { Either, Result, left, right } from "@utils/result";
import {
  CreateSubcategoryDTO,
  SubcategoryDTO,
} from "@components/subcategories/domain/subcategoryDTO";
import { CreateSubcategoryErrors } from "@components/subcategories/useCases/createSubcategory/createSubcategoryErrors";
import { UseCase } from "@domain/useCase";
import { ISubcategoryRepo } from "@components/subcategories/subcategories.repository";
import { Name } from "@components/properties/domain/name";
import { Subcategory } from "@components/subcategories/domain/subcategory";
import { SubcategoryMap } from "@components/subcategories/subcategories.map";

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/indent */
type Response = Either<
  CreateSubcategoryErrors.InvalidNameLength | Result<any>,
  Result<SubcategoryDTO>
>;

class CreateSubcategoryUseCase
  implements UseCase<CreateSubcategoryDTO, Promise<Response>>
{
  private repo: ISubcategoryRepo;

  constructor(subcategoryRepo: ISubcategoryRepo) {
    this.repo = subcategoryRepo;
  }

  async execute(request: CreateSubcategoryDTO): Promise<Response> {
    const nameResult = Name.create(request.name);
    if (nameResult.isFailure) {
      return left(Result.fail<void>(nameResult.error)) as Response;
    }

    const subcategoryOrError = Subcategory.create({
      name: nameResult.getValue(),
    });

    if (subcategoryOrError.isFailure) {
      return left(Result.fail<void>(subcategoryOrError.error)) as Response;
    }

    const subcategory: Subcategory = subcategoryOrError.getValue();

    try {
      await this.repo.save(subcategory);
    } catch (err: unknown) {
      return left(Result.fail<void>((err as Error).stack));
    }

    return right(
      Result.ok<SubcategoryDTO>(SubcategoryMap.toDTO(subcategory)),
    ) as Response;
  }
}

export { CreateSubcategoryUseCase };
