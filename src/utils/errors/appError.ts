import { type HttpCode } from "@utils/errors/errorTypes";

/**
 * @deprecated
 */
class AppError extends Error {
  public readonly name: string;

  public readonly httpCode: HttpCode;

  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpCode,
    description: string,
    isOperational: boolean,
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export default AppError;
