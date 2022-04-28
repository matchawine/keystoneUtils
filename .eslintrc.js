module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: [
    "graphql",
    "@typescript-eslint",
    "promise",
    "immutable",
    "react-hooks",
    "jest",
    "immutable",
  ],
  rules: {
    "promise/catch-or-return": "off",
    "promise/always-return": 0,
    "immutable/no-let": 1,
    "immutable/no-mutation": 1,
    yoda: "warn",
    eqeqeq: "warn",
    "no-implicit-globals": "warn",
    "no-param-reassign": "error",
    "max-lines-per-function": ["warn", 50],
    "max-depth": ["warn", 4],
    "object-shorthand": "error",
    "no-async-promise-executor": "warn",
    "react/prop-types": 0,
    "max-params": ["warn", 3],
    "arrow-body-style": ["warn", "as-needed"],
    "graphql/template-strings": [
      "error",
      {
        env: "apollo",
      },
    ],
    "graphql/named-operations": [
      "warn",
      {
        env: "apollo",
      },
    ],
  },
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "max-lines-per-function": "off",
        "sonarjs/no-duplicate-string": "off",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-return": "off",
      },
    },
  ],
  reportUnusedDisableDirectives: true,
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ".eslintrc.js",
}
