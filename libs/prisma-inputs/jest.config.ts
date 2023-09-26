import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    './index.ts',
    './mappers.ts',
    './builder.ts',
    './deepCompare.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};

export default config;
