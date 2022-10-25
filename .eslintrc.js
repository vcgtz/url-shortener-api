module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'prettier',
  ],
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'prettier/prettier': 'error',
  },
};
