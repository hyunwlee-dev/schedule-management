import type { UserConfig } from '@commitlint/types';
const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'chore',
        'ci',
        'refactor',
        'revert',
        'test',
        'remove',
        'move',
        'docs',
        'perf',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
  },
};
module.exports = Configuration;
