class Result<T> {
  public isSuccess: boolean;

  public isFailure: boolean;

  public error: T | string | null | undefined;

  private value: T | null | undefined;

  public constructor(isSuccess: boolean, error?: T | string | null, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        "InvalidOperation: A result cannot be successful and contain an error",
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
      return this.error as T;
    }

    return this.value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
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

export default Result;
