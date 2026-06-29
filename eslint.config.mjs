import cds from "@sap/cds/eslint.config.mjs";

export default [
  ...cds.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        // Node.js globals
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        console: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        // SAP CAP CQL globals available in service handlers
        SELECT: "readonly",
        INSERT: "readonly",
        UPDATE: "readonly",
        DELETE: "readonly",
        CREATE: "readonly",
        DROP: "readonly",
        cds: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];
