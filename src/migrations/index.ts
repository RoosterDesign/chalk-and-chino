import * as migration_20250322_121159_initial from './20250322_121159_initial';

export const migrations = [
  {
    up: migration_20250322_121159_initial.up,
    down: migration_20250322_121159_initial.down,
    name: '20250322_121159_initial'
  },
];
