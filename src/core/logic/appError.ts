/* eslint-disable @typescript-eslint/no-explicit-any */
import DomainError from "@core/domain/domainError";
import Result from "./result";

/**
 * @description General application errors
 */
export namespace AppError {
  export class UnexpectedError extends Result<DomainError> {
    public constructor(err: any) {
      super(false, {
        message: "An unexpected error occurred.",
        error: err,
      });
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
