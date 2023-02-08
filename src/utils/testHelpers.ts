import express from "express";
import loadExpress from "loaders/express";

const routeTestInit = (app: express.Application) => {
  beforeAll(async () => {
    await loadExpress({ app });
  });
};

export default { routeTestInit };
