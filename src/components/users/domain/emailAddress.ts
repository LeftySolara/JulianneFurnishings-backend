import { ValueObject } from "@domain/valueObject";
import { Guard, IGuardResult } from "@utils/guard";
import { Result } from "@utils/result";

interface EmailAddressProps {
  value: string;
}

class EmailAddress extends ValueObject<EmailAddressProps> {
  private static emailFormat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  get value(): string {
    return this.props.value;
  }

  /* eslint-disable-next-line no-useless-constructor */
  private constructor(props: EmailAddressProps) {
    super(props);
  }

  public static create(emailAddress: string): Result<EmailAddress> {
    const nullOrUndefinedResult: IGuardResult = Guard.againstNullOrUndefined(
      emailAddress,
      "emailAddress",
    );
    if (!nullOrUndefinedResult.succeeded) {
      return Result.fail<EmailAddress>(nullOrUndefinedResult.message);
    }

    const re = new RegExp(EmailAddress.emailFormat);
    if (re.exec(emailAddress) === null) {
      return Result.fail<EmailAddress>("Invalid email address.");
    }

    return Result.ok<EmailAddress>(new EmailAddress({ value: emailAddress }));
  }
}

export { EmailAddress };
