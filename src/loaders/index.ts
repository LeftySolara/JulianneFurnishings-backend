import { Application } from "express";
import logger from "@utils/logger";
import loadExpress from "./express";

const runLoaders = async (app: Application) => {
  logger.info("Starting application...");

  await loadExpress({ app });
  logger.info("Express initialized.");
};

export default runLoaders;
