import bcrypt from "bcrypt";
import { Name } from "@components/users/domain/name";
import { EmailAddress } from "@components/users/domain/emailAddress";
import { CreateUserDTO, UserDTO } from "@components/users/domain/userDTO";
import { IUserRepo } from "@components/users/users.repository";
import { UseCase } from "@domain/useCase";
import { Either, Result, left, right } from "@utils/result";
import { HashedPassword } from "@components/users/domain/hashedPassword";
import { User } from "@components/users/domain/user";
import { UserMap } from "@components/users/users.map";
import { CreateUserErrors } from "@components/users/useCases//createUser/createUserErrors";

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/indent */
type Response = Either<
  CreateUserErrors.EmailAddressInUse | Result<any>,
  Result<UserDTO>
>;

class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>> {
  private repo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.repo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const hash: string = await bcrypt.hash(request.password, 13);

    const firstNameOrError = Name.create(request.firstName);
    const lastNameOrError = Name.create(request.lastName);
    const emailAddressOrError = EmailAddress.create(request.emailAddress);
    const hashedPasswordOrError = HashedPassword.create(hash);

    const combinedResult = Result.combine([
      firstNameOrError,
      lastNameOrError,
      emailAddressOrError,
      hashedPasswordOrError,
    ]);

    if (combinedResult.isFailure) {
      return left(Result.fail<void>(combinedResult.error)) as Response;
    }

    const userOrError = User.createUser({
      firstName: firstNameOrError.getValue(),
      lastName: lastNameOrError.getValue(),
      emailAddress: emailAddressOrError.getValue(),
      hashedPassword: hashedPasswordOrError.getValue(),
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
    });

    if (userOrError.isFailure) {
      return left(Result.fail<void>(combinedResult.error)) as Response;
    }

    const user: User = userOrError.getValue();

    const emailInUse = await this.repo.exists(user.emailAddress.value);
    if (emailInUse) {
      return left(
        new CreateUserErrors.EmailAddressInUse(user.emailAddress.value),
      ) as Response;
    }

    try {
      await this.repo.save(user);
    } catch (err: unknown) {
      return left(Result.fail<void>((err as Error).stack));
    }

    return right(Result.ok<UserDTO>(UserMap.toDTO(user))) as Response;
  }
}

export { CreateUserUseCase };
