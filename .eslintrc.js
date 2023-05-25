module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  plugins: ['eslint-plugin-import-helpers', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  rules: {
    'prettier/prettier': 'error',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'never',
        groups: [
          '/^node/',
          '/^react/',
          'module',
          '/^@app/domain/',
          '/^@app/infrastructure/',
          '/^@app/assets/',
          '/^@app/components/',
          '/^@app/hooks/',
          '/^@app/pages/',
          '/^@app/routes/',
          '/^@app/utils/',
          '/^@app/styles/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
};
