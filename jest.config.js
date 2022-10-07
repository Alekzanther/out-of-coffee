const { defaults } = require('jest-config');

/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'mts',
    'cts',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { presets: ['next/babel'] },
    ],
  },
};

module.exports = config;
