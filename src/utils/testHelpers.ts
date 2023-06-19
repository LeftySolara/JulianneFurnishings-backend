import express from "express";
import loadExpress from "@infra/http/expressLoader";
import { beforeAll, afterAll, afterEach } from "vitest";
import { database } from "@infra/database/database";

const routeTestInit = (app: express.Application) => {
  beforeAll(async () => {
    await loadExpress({ app });
  });

  /* Clear all data in the database. */
  afterEach(async () => {
    const transactions = [];
    transactions.push(database.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

    /* eslint-disable @typescript-eslint/indent */
    const tableNames = await database.$queryRaw<
      Array<{ TABLE_NAME: string }>
    >`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA = 'julianneFurnishingsTest';`;

    /* eslint-disable no-restricted-syntax */
    for (const { TABLE_NAME } of tableNames) {
      if (TABLE_NAME !== "_prisma_migrations") {
        try {
          transactions.push(
            database.$executeRawUnsafe(`TRUNCATE ${TABLE_NAME};`),
          );
        } catch (err) {
          console.log(err);
        }
      }
    }

    transactions.push(database.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);

    try {
      await database.$transaction(transactions);
    } catch (err) {
      console.log({ err });
    }
  });

  afterAll(async () => {
    await database.$disconnect();
  });
};

export { routeTestInit };
