import pino from "pino";
import { appConfig } from "./appConfig";

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: appConfig.logger.logLocation, mkdir: true },
      level: "info",
    },
    {
      target: "pino/file",
      options: { destination: 1 },
      level: "trace",
    },
  ],
});

const logger = pino(
  {
    level: appConfig.logger.logLevel as string,
    redact: [
      "email",
      "emailAddress",
      "password",
      "passwordConfirmation",
      "confirmPassword",
      "name",
      "firstName",
      "lastName",
      "username",
    ],
  },
  transport,
);

export default logger;
