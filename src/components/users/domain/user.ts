import { Entity } from "@domain/entity";
import { Name } from "@components/users/domain/name";
import { HashedPassword } from "@components/users/domain/hashedPassword";
import { EmailAddress } from "@components/users/domain/emailAddress";
import { UniqueEntityId } from "@domain/uniqueEntityId";
import { Result } from "@utils/result";
import { Guard, IGuardResult } from "@utils/guard";
import { Slug } from "@domain/slug";

interface IUserProps {
  firstName: Name;
  lastName: Name;
  emailAddress: EmailAddress;
  hashedPassword: HashedPassword;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}

class User extends Entity<IUserProps> {
  get firstName(): Name {
    return this.props.firstName;
  }

  get lastName(): Name {
    return this.props.lastName;
  }

  get emailAddress(): EmailAddress {
    return this.props.emailAddress;
  }

  get hashedPassword(): HashedPassword {
    return this.props.hashedPassword;
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

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: IUserProps, id?: UniqueEntityId, slug?: Slug) {
    super(props, id, slug);
  }

  public static createUser(
    props: IUserProps,
    id?: UniqueEntityId,
    slug?: Slug,
  ): Result<User> {
    const userPropsCheck: IGuardResult = Guard.againstNullOrUndefinedBulk([
      { argumentName: "firstName", argument: props.firstName },
      { argumentName: "lastName", argument: props.lastName },
      { argumentName: "emailAddress", argument: props.emailAddress },
      { argumentName: "hashedPassword", argument: props.hashedPassword },
      { argumentName: "createdAt", argument: props.createdAt },
    ]);

    if (!userPropsCheck.succeeded) {
      return Result.fail<User>(userPropsCheck.message as string);
    }

    return Result.ok<User>(new User(props, id, slug));
  }
}

type UserCollection = User[];

export { User, UserCollection };
