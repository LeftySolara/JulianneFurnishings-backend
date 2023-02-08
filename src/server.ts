import logger from "@utils/logger";

logger.info("Hello World!");

const gracefulShutdown = (cause: string) => {
  logger.info({ cause }, "Closing HTTP server due to %s.");
};

process.on("uncaughtException", (err) => {
  logger.error(err);
});

process.on("unhandledRejection", (err) => {
  logger.error(err);
});

process.on("SIGTERM", () => gracefulShutdown("app termination"));
process.on("SIGUSR2", () => gracefulShutdown("ts-node restart"));
process.on("SIGINT", () => gracefulShutdown("app termination"));
