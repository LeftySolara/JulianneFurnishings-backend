module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  testMatch: ["**/*.test.ts"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@components(.*)$": "<rootDir>/src/components$1",
    "@loaders(.*)": "<rootDir>/src/loaders$1",
    "@utils(.*)$": "<rootDir>/src/utils$1",
  },
};
