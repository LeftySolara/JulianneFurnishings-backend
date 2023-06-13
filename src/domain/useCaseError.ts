interface IUseCaseError extends Error {}

abstract class UseCaseError implements IUseCaseError {
  public readonly message: string;

  public readonly name: string;

  constructor(message: string) {
    this.message = message;
    this.name = this.constructor.name;
  }
}

export { UseCaseError };
