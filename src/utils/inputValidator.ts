import { Request } from "express";
import { validationResult, Result, ValidationError } from "express-validator";
import logger from "./logger";

const validateRequestInputs = (req: Request): Error | undefined => {
  const result: Result<ValidationError> = validationResult(req);
  let err: Error | undefined;

  if (!result.isEmpty()) {
    logger.error(
      `Invalid inputs passed for ${req.method} request at ${req.originalUrl}`,
    );
    err = new Error(result.array({ onlyFirstError: true })[0].msg);
  }

  return err;
};

export default validateRequestInputs;
