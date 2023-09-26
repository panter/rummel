module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'boundaries'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:boundaries/recommended',
  ],
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'boundaries/element-types': [
      2,
      {
        default: 'disallow',
        rules: [
          {
            from: ['common'],
            allow: ['common'],
          },
          {
            from: ['asset-manager'],
            allow: ['asset-manager', 'common'],
          },
          {
            from: ['api'],
            allow: ['api', 'core', 'common'],
          },
          {
            from: ['core'],
            allow: ['core', 'common', 'asset-manager'],
          },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'boundaries/elements': [
      {
        type: 'api',
        pattern: 'apps/api/src/**',
      },
      {
        type: 'core',
        pattern: 'libs/core/src/**',
        mode: 'folder',
      },
      {
        type: 'common',
        pattern: 'libs/common/src/**',
        mode: 'folder',
      },
      {
        type: 'asset-manager',
        pattern: 'libs/asset-manager/src/**',
        mode: 'folder',
      },
    ],
  },
};
