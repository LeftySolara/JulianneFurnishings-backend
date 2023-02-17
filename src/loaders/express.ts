import { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser, { urlencoded } from "body-parser";
import { appConfig } from "@utils/appConfig";
import { AppError, ErrorHandler, commonHttpErrors } from "@utils/errors";
import logger from "@utils/logger";
import pinoHTTP from "pino-http";
import CategoryRoutesWrapper from "@components/products/categories/category.routes";
import CategoryController from "@components/products/categories/category.controller";

interface ControllerWrapper {
  categoryController?: CategoryController;
}

const loadExpress = async ({
  app,
  controllers = {} as ControllerWrapper,
}: {
  app: Application;
  controllers?: ControllerWrapper;
}) => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));

  app.use(pinoHTTP({ logger }));

  /* Add CORS headers to all responses. */
  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      appConfig.express.corsOrigin as string,
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

  const categoryRoutes = controllers
    ? new CategoryRoutesWrapper(controllers.categoryController)
    : new CategoryRoutesWrapper();

  app.use("/categories", categoryRoutes.router);

  app.use(
    /* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
    async (err: AppError, req: Request, res: Response, next: NextFunction) => {
      await ErrorHandler.handleError(err, res);
    },
  );

  return app;
};

export default loadExpress;
