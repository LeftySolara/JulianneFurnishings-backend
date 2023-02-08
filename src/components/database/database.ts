import { Dialect, Sequelize } from "sequelize";
import { appConfig, IAppConfig } from "@utils/appConfig";
import logger from "@utils/logger";

class Database {
  public readonly db: Sequelize;

  constructor(options: IAppConfig["database"]) {
    this.db = new Sequelize(options.name, options.user, options.password, {
      host: options.host,
      port: options.port,
      dialect: options.dialect as Dialect,
      logging: (msg: string) => logger.debug(msg),
    });
  }

  public async disconnect(): Promise<void> {
    await this.db.close();
  }

  public async verifyConnection(): Promise<void> {
    await this.db.authenticate();
  }
}

export default new Database(appConfig.database);
