module.exports = {
  root: false,
  extends: [
    'plugin:vue/essential',
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-require-imports': false,
  },
};
