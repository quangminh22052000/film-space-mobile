/* eslint-env node */
/* global module */
module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@app/(.*)$": "<rootDir>/app/$1",
    "^@libs/(.*)$": "<rootDir>/libs/$1",
    "^@screens/(.*)$": "<rootDir>/screens/$1",
    "^@assets/(.*)$": "<rootDir>/assets/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "libs/**/*.{ts,tsx}",
    "screens/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/coverage/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  verbose: true,
  testTimeout: 10000,
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo|@expo|@unimodules|@react-native-community|@react-native-async-storage|@react-native-seoul|@shopify|@tanstack|zustand|moti|lottie-react-native|@lottiefiles)",
  ],
  testPathIgnorePatterns: ["node_modules/", ".expo/"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.expo/"],
  roots: ["<rootDir>"],
  testEnvironmentOptions: {
    url: "http://localhost",
  },
}
