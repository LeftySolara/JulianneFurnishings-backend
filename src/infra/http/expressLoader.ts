import { Application } from "express";
import bodyParser, { urlencoded } from "body-parser";
import { pinoHttp } from "pino-http";
import { appConfig } from "@utils/appConfig";
import logger from "@utils/logger";
import { usersRouter } from "@components/users/users.routes";
import { categoriesRouter } from "@components/categories/categories.routes";
import { subcategoriesRouter } from "@components/subcategories/subcategories.routes";
import { roomsRouter } from "@components/rooms/rooms.routes";

const loadExpress = async ({ app }: { app: Application }) => {
  app.use(bodyParser.json());
  app.use(urlencoded({ extended: true }));

  app.use(pinoHttp({ logger }));

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

  app.use("/users", usersRouter);
  app.use("/categories", categoriesRouter);
  app.use("/subcategories", subcategoriesRouter);
  app.use("/rooms", roomsRouter);
};

export default loadExpress;
