import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default [
  includeIgnoreFile(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.gitignore")
  ),
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-assertions": ["error", { "assertionStyle": "as" }]
    },
  },

  {
    ignores: [
      "dist/",
    ],
  },
];