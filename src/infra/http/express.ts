import { Application, NextFunction, Request, Response } from "express";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import bodyParser, { urlencoded } from "body-parser";
import { appConfig } from "@utils/appConfig";
import logger from "@utils/logger";
import pinoHTTP from "pino-http";
import { Errors } from "@core/logic/appError";
import { ErrorHandler } from "@core/logic/errorHandler";
import { productRouter } from "@modules/product/infra/http/productRoutes";

const loadExpress = async ({ app }: { app: Application }) => {
  const checkJwt = auth({
    audience: appConfig.auth0.audience,
    issuerBaseURL: appConfig.auth0.issuerBaseUrl,
  });

  const checkScopes = requiredScopes("create:products");

  app.use(bodyParser.json());
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

  app.use(
    /* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
    async (
      err: Errors.AppError,
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      await ErrorHandler.handleError(err);
      return res.status(500).json({ message: err.message });
    },
  );

  app.use("/products", productRouter);

  /*
  app.get("/", (req, res) => {
    return res
      .status(commonHttpErrors.ok)
      .json("Hello World! This is a public endpoint!");
  });

  app.get("/private", checkJwt, (req, res) => {
    return res.status(200).json("This is a private endpoint!");
  });

  app.get("/scopes", checkJwt, checkScopes, (req, res) => {
    return res
      .status(200)
      .json("You need a scope of create:products to see this!");
  });
  */

  return app;
};

export default loadExpress;
