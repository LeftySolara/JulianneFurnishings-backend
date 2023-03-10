export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    let result: IGuardResult = { succeeded: true };

    guardResults.forEach((guardResult) => {
      if (guardResult.succeeded === false) {
        result = guardResult;
      }
    });

    return result;
  }

  public static againstNullOrUndefined(
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
    let result = { succeeded: true };

    args.forEach((arg) => {
      const res = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (!res.succeeded) {
        result = res;
      }
    });

    return result;
  }

  public static isOneOf(
    value: any,
    validValues: any[],
    argumentName: string,
  ): IGuardResult {
    let isValid = false;
    validValues.forEach((validValue) => {
      if (value === validValue) {
        isValid = true;
      }
    });

    if (isValid) {
      return { succeeded: true };
    }
    return {
      succeeded: false,
      message: `${argumentName} isn't one of the correct types in ${JSON.stringify(
        validValues,
      )}`,
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
        message: `${argumentName} is not withing range ${min} to ${max}.`,
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

    numbers.forEach((num) => {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) {
        failingResult = numIsInRangeResult;
      }
    });

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    }
    return { succeeded: true };
  }

  public static isNonNegative(num: number, argumentName: string): IGuardResult {
    const isNegative = num < 0;

    if (isNegative) {
      return { succeeded: false, message: `${argumentName} is negative.` };
    }
    return { succeeded: true };
  }

  public static isNonNegativeBulk(
    nums: number[],
    argumentName: string,
  ): IGuardResult {
    let failingResult: IGuardResult | null = null;

    nums.forEach((num) => {
      const isNonNegativeResult = this.isNonNegative(num, argumentName);
      if (!isNonNegativeResult.succeeded) {
        failingResult = isNonNegativeResult;
      }
    });

    if (failingResult) {
      return { succeeded: false, message: `${argumentName} is negative.` };
    }
    return { succeeded: true };
  }
}
