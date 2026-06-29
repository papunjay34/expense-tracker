import cds from "@sap/cds/eslint.config.mjs";

export default [
  ...cds.recommended,
  {
    languageOptions: {
      globals: {
        // SAP CAP CQL globals available in service handlers
        SELECT: "readonly",
        INSERT: "readonly",
        UPDATE: "readonly",
        DELETE: "readonly",
        CREATE: "readonly",
        DROP: "readonly",
      },
    },
    rules: {
      "no-undef": "error", // catches typos like thi.on instead of this.on
      "no-unused-vars": "warn", // flags declared but never-used variables
    },
  },
];
