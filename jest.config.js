/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/tests/unit_tests/**/*.test.ts",
    "<rootDir>/tests/integration_tests/**/*.test.ts",
  ],
};
