import vue from 'eslint-plugin-vue';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import parser from 'vue-eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'),
  {
    plugins: { vue, '@typescript-eslint': typescriptEslint },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...vue.environments['setup-compiler-macros']['setup-compiler-macros'],
      },

      parser: parser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },

    rules: {
      'max-len': ['error', 250],
      curly: ['error', 'all'],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      'no-irregular-whitespace': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },
];
