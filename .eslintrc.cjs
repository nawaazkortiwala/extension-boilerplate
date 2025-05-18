/* eslint-disable @typescript-eslint/no-var-requires */
// Use .eslintrc.cjs for CommonJS config to avoid ESM cycle errors with ESLint
module.exports = {
  root: true,
  env: { browser: true, node: true, es2021: true },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'src/popup/**',
    '.eslintrc.cjs'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
    // 'project' intentionally omitted to avoid type-checking config files
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
};
// Remove 'project' from parserOptions to avoid ESLint trying to type-check config files.
