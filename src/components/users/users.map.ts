import { User } from "@components/users/domain/user";
import { UserDTO } from "@components/users/domain/userDTO";
import { Name } from "@components/users/domain/name";
import { EmailAddress } from "@components/users/domain/emailAddress";
import { HashedPassword } from "@components/users/domain/hashedPassword";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Slug } from "@domain/slug";
import { Result } from "@utils/result";

interface RawUserProps {
  userId: number;
  uuid: string;
  slug: string | null;
  firstName: string;
  lastName: string;
  emailAddress: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

class UserMap {
  public static toDTO(user: User): UserDTO {
    return {
      uuid: user.uuid.props.value,
      slug: user.entitySlug.props.value,
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      emailAddress: user.emailAddress.value,
      hashedPassword: user.hashedPassword.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public static toPersistence(user: User): any {
    return {
      uuid: user.uuid.props.value,
      slug: user.entitySlug.props.value,
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      emailAddress: user.emailAddress.value,
      hashedPassword: user.hashedPassword.value,
      deletedAt: user.deletedAt,
    };
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  public static toDomain(raw: RawUserProps): User {
    const uuid = new UniqueEntityId({ value: raw.uuid });
    const slug = new Slug(
      raw.slug ? { value: raw.slug } : undefined,
      uuid.props.value,
    );
    const firstName = Name.create(raw.firstName);
    const lastName = Name.create(raw.lastName);
    const emailAddress = EmailAddress.create(raw.emailAddress);
    const hashedPassword = HashedPassword.create(raw.hashedPassword);
    const { createdAt, updatedAt, deletedAt } = raw;

    const valueObjectCheck = Result.combine([
      firstName,
      lastName,
      emailAddress,
      hashedPassword,
    ]);

    if (valueObjectCheck.isFailure) {
      throw new Error(valueObjectCheck.errorValue.toString());
    }

    const createUserResult = User.createUser(
      {
        firstName: firstName.getValue(),
        lastName: lastName.getValue(),
        emailAddress: emailAddress.getValue(),
        hashedPassword: hashedPassword.getValue(),
        createdAt,
        updatedAt: updatedAt ?? undefined,
        deletedAt: deletedAt ?? undefined,
      },
      uuid,
      slug,
    );

    if (createUserResult.isFailure) {
      throw new Error(createUserResult.error?.toString());
    }

    return createUserResult.getValue();
  }
}

export { UserMap };
