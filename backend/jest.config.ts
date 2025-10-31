// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  extensionsToTreatAsEsm: ['.ts'],

  moduleNameMapper: {
    // 👇 clave para permitir imports .js en tu código TS durante los tests
    '^(\\.{1,2}/.*)\\.js$': '$1',

    // tus mappers previos
    '^@prisma/client$': '<rootDir>/node_modules/@prisma/client/index.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { useESM: true, tsconfig: 'tsconfig.test.json', diagnostics: false } // isolatedModules en tsconfig.test.json
    ],
  },

  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],

  transformIgnorePatterns: [
    'node_modules/(?!(node-fetch|@prisma/client|@babel/runtime/helpers/esm/))',
  ],

  moduleDirectories: ['node_modules', 'src'],


  // setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  // globalTeardown: '<rootDir>/src/__tests__/teardown.ts',
};

export default config;