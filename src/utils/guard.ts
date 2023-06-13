interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

interface IGuardArgument {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  argument: any;
  argumentName: string;
}

type GuardArgumentCollection = IGuardArgument[];

class Guard {
  /**
   * Check whether a collection of results contains a failure.
   *
   * @param guardResults The array of results to check.
   *
   * @returns The failed result, if one exists. Otherwise, returns a succeeding result.
   */
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const result of guardResults) {
      if (result.succeeded === false) {
        return result;
      }
    }

    return { succeeded: true };
  }

  /**
   * Check whether an argument is null or undefined.
   *
   * @param argument The argument to check.
   * @param argumentName The name of the argument.
   *
   * @returns A failed result if the argument is null or undefined, or a successful result otherwise.
   */
  public static againstNullOrUndefined(
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    argument: any,
    argumentName: string,
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined.`,
      };
    }

    return { succeeded: true };
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection,
  ): IGuardResult {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName,
      );
      if (!result.succeeded) {
        return result;
      }
    }

    return { succeeded: true };
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static isOneOf(
    value: any,
    validValues: any[],
    argumentName: string,
  ): IGuardResult {
    let isValid = false;
    /* eslint-disable-next-line no-restricted-syntax */
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true };
    }
    return {
      succeeded: false,
      message: `${argumentName} isn't one of the correct types in ${JSON.stringify(
        validValues,
      )}. Got "${value}"`,
    };
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string,
  ): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return {
        succeeded: false,
        message: `${argumentName} is not within range ${min} to ${max}.`,
      };
    }

    return { succeeded: true };
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string,
  ): IGuardResult {
    let failingResult: IGuardResult | null = null;
    /* eslint-disable-next-line no-restricted-syntax */
    for (const num of numbers) {
      const numIsInRangeResult = Guard.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) {
        failingResult = numIsInRangeResult;
      }
    }

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    }

    return { succeeded: true };
  }
}

export { Guard, IGuardArgument, IGuardResult };
