import dotenv from "dotenv";

interface IAppConfig {
  express: {
    serverPort: string | undefined;
    corsOrigin: string | undefined;
  };
  logger: {
    logLevel: string | undefined;
    logLocation: string | undefined;
  };
  uuid: {
    namespace: string | undefined;
    name: string | undefined;
  };
}

/* Load environment variables. If we're not running in a production environment, then
 * get the variables from a .env file. Otherwise, use the deployed environment. */
if (
  process.env.NODE_ENV !== "production" &&
  process.env.NODE_ENV !== "testci"
) {
  const configOutput = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
  if (configOutput.error) {
    throw new Error("Error loading environment variables.");
  }
}

const appConfig: IAppConfig = {
  express: {
    serverPort: process.env.SERVER_PORT,
    corsOrigin: process.env.CORS_ORIGIN,
  },
  logger: {
    logLevel: process.env.LOG_LEVEL,
    logLocation: process.env.LOG_LOCATION,
  },
  uuid: {
    namespace: process.env.UUID_NAMESPACE,
    name: process.env.UUID_NAME,
  },
};

export { appConfig, IAppConfig };
