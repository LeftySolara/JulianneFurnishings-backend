import { Request, Response } from "express";
import logger from "@utils/logger";

export abstract class BaseController {
  protected req: Request | undefined;

  protected res: Response | undefined;

  protected abstract executeImpl(): Promise<void | any>;

  public execute(req: Request, res: Response): void {
    this.req = req;
    this.res = res;

    this.executeImpl();
  }

  public static jsonResponse(
    res: Response,
    statusCode: number,
    message: string,
  ) {
    return res.status(statusCode).json({ message });
  }

  /* eslint-disable-next-line class-methods-use-this */
  public ok<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }

  /* eslint-disable-next-line class-methods-use-this */
  public created(res: Response) {
    return res.sendStatus(201);
  }

  public clientError(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      400,
      message || "Unauthorized",
    );
  }

  public unauthorized(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      401,
      message || "unauthorized",
    );
  }

  public paymentRequired(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      402,
      message || "Payment Required",
    );
  }

  public forbidden(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      403,
      message || "Forbidden",
    );
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      404,
      message || "Not Found",
    );
  }

  public conflict(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      409,
      message || "Conflict",
    );
  }

  public tooMany(message?: string) {
    return BaseController.jsonResponse(
      this.res as Response,
      429,
      message || "Too many requests",
    );
  }

  public fail(error: Error | string) {
    logger.error(error);
    return (this.res as Response).status(500).json({
      message: error.toString(),
    });
  }
}
