/* eslint-disable class-methods-use-this */
import logger from "@utils/logger";
import validateRequestInputs from "@utils/inputValidator";
import { Request, Response } from "express";

abstract class BaseController {
  protected req: Request | undefined;

  protected res: Response | undefined;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  protected abstract executeImpl(): Promise<any>;

  /* eslint-disable-next-line consistent-return */
  public async execute(req: Request, res: Response): Promise<void> {
    const validationError = validateRequestInputs(req);
    if (validationError) {
      BaseController.jsonResponse(res, 422, validationError.message);
    }

    this.req = req;
    this.res = res;

    await this.executeImpl();
  }

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(200).json(dto);
    }

    return res.sendStatus(200);
  }

  public badRequest(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      400,
      message ?? "Bad request",
    );
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      404,
      message ?? "Not Found",
    );
  }

  public fail(error: Error | string) {
    logger.error(error);
    return this.res?.status(500).json({ message: error.toString() });
  }
}

export { BaseController };
