export namespace Errors {
  export class AppError extends Error {
    public readonly name: string;

    public readonly isOperational: boolean;

    constructor(name: string, description: string, isOperational: boolean) {
      super(description);

      Object.setPrototypeOf(this, new.target.prototype);

      this.name = name;
      this.isOperational = isOperational;

      Error.captureStackTrace(this);
    }
  }

  export const commonErrorNames = {
    entityCreationError: "Entity creation error",
  };
}
