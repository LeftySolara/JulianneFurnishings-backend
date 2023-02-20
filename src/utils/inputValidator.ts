import { Request } from "express";
import { validationResult, Result, ValidationError } from "express-validator";
import logger from "@utils/logger";
import { AppError, commonErrorNames, commonHttpErrors } from "@utils/errors";

const validateRequestInputs = (req: Request): AppError | undefined => {
  const result: Result<ValidationError> = validationResult(req);
  let err: AppError | undefined;

  if (!result.isEmpty()) {
    logger.error(
      `Invalid inputs passed for ${req.method} request at ${req.originalUrl}`,
    );
    err = new AppError(
      commonErrorNames.badRequest,
      commonHttpErrors.badRequest,
      result.array({ onlyFirstError: true })[0].msg,
      true,
    );
  }
  return err;
};

export default validateRequestInputs;
