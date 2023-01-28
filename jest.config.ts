export default {
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { diagnostics: false }],
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  setupFiles: ["./test/loadEnv.ts"],
}
