/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePaths: ["<rootDir>"],
    testMatch: ["<rootDir>/**/*.test.ts"],
    collectCoverage: true,
    coverageDirectory: "<rootDir>/coverage",
    collectCoverageFrom: ["<rootDir>/**/*.ts"],
    coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
    coverageReporters: ["json", "lcov", "text", "clover"],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
};  