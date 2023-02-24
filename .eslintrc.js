/* eslint-disable import/no-commonjs */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'import', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/dist/*'],
  rules: {
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: false },
    ],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'react/prop-types': ['error', { skipUndeclared: true }],
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/display-name': 'off',
    'import/no-duplicates': ['error', { 'prefer-inline': true }],
    'import/no-commonjs': 'error',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        groups: ['external', 'internal', 'parent', 'sibling'],
        pathGroupsExcludedImportTypes: [],
        alphabetize: { order: 'asc', caseInsensitive: true },
        warnOnUnassignedImports: true,
        'newlines-between': 'never',
      },
    ],
  },
}
