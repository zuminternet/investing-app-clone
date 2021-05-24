module.exports = {
  root: true,
  env: { node: true },
  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/typescript', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, minProperties: 3 },
        ObjectPattern: { multiline: true, minProperties: 3 },
        ImportDeclaration: 'never',
        ExportDeclaration: 'never',
      },
    ],
  },
};
