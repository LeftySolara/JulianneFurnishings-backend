/* eslint-disable max-classes-per-file,class-methods-use-this,no-use-before-define */
import logger from "@utils/logger";

class Result<T> {
  public isSuccess: boolean;

  public isFailure: boolean;

  public error: T | string | null | undefined;

  private value: T | null | undefined;

  public constructor(isSuccess: boolean, error?: T | string | null, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        "InvalidOperation: A result cannot be successful and contain an error.",
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        "InvalidOperation: A failing result must contain an error message.",
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess || !this.value) {
      logger.error(this.error);
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead.",
      );
    }

    return this.value;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  /**
   * Check the validity of an array of results.
   * Useful for checking if there is a failure in a group of results.
   *
   * @param results The array of results to check.
   *
   * @returns The failed result, if one exists. Otherwise returns Result.ok<any>.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static combine(results: Result<any>[]): Result<any> {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok<any>();
  }
}

type Either<L, A> = Left<L, A> | Right<L, A>;

class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};

export { Result, Either, Left, Right, left, right };
