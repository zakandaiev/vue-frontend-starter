import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import { absPath } from './vite/path.js';

const compat = new FlatCompat({
  baseDirectory: absPath.root,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'build',
      'coverage',
      'docs',
      'dist',
      'dist-ssr',
      'node_modules',
      'src/i18n/index.js',
    ],
  },
  ...compat.extends('airbnb-base', 'plugin:vue/recommended'),
  {
    plugins: {
      vue,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
        },
      },
    },

    files: ['**/*.{vue,js,jsx,cjs,mjs}'],

    rules: {
      'consistent-return': 0,
      'import/extensions': 0,
      'import/no-cycle': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'max-len': 0,
      'no-param-reassign': 0,
      'no-unneeded-ternary': 0,
      'no-use-before-define': 0,
      'vue/multi-word-component-names': 0,
      'vue/no-multiple-template-root': 0,
      'vue/no-v-for-template-key': 0,
      'vue/no-v-model-argument': 0,
    },
  },
];
