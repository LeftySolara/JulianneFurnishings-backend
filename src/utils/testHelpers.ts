import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prisma from "@components/database/database";

import express from "express";
import loadExpress from "loaders/express";

jest.mock("@components/database/database", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

const routeTestInit = (app: express.Application) => {
  beforeAll(async () => {
    await loadExpress({ app });
  });
};

export { prismaMock, routeTestInit };
