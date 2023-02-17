import dotenv from "dotenv";

interface IAppConfig {
  express: {
    serverPort: string | undefined;
    corsOrigin: string | undefined;
    baseUrl: string | undefined;
  };
  logger: {
    logLevel: string | undefined;
    logLocation: string | undefined;
  };
  database: {
    name: string;
    user: string;
    password: string;
    host: string;
    port: number;
    dialect: string;
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
    throw new Error("Error loading environment variables");
  }
}

const appConfig: IAppConfig = {
  express: {
    serverPort: process.env.PORT,
    corsOrigin: process.env.CORS_ORIGIN,
    baseUrl: process.env.BASE_URL,
  },
  logger: {
    logLevel: process.env.LOG_LEVEL,
    logLocation: process.env.LOG_LOCATION,
  },
  database: {
    name: process.env.DATABASE_NAME as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    host: process.env.DATABASE_HOST as string,
    port: parseInt(process.env.DATABASE_PORT as string, 10),
    dialect: process.env.DATABASE_DIALECT as string,
  },
};

export { appConfig, IAppConfig };
