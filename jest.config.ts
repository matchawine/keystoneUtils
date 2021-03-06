export default {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  setupFiles: ["./test/loadEnv.ts"],
  globals: {
    "ts-jest": { diagnostics: false },
  },
}
