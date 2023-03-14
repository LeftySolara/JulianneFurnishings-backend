import logger from "@utils/logger";
import { AppError } from "./appError";

export class ErrorHandler {
  private static isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  private static async crashIfUntrustedError(error: Error) {
    if (!ErrorHandler.isTrustedError(error)) {
      process.exit(1);
    }
  }

  public static async handleError(error: Error) {
    logger.error(error);
    await ErrorHandler.crashIfUntrustedError(error);
  }
}
