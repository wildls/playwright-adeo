import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser, // Browser globals
        ...globals.node,    // Node.js globals
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier, // Replaces "extends: ['prettier']"
  {
    files: ["**/*.{test,spec}.{js,ts,mjs,cjs}"],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs["recommended"].rules,
      "playwright/no-conditional-in-test": "off",
      "playwright/expect-expect" : "off"
    },
  },
];
