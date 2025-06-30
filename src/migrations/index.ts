import * as migration_20250322_121159_initial from './20250322_121159_initial';
import * as migration_20250509_115910 from './20250509_115910';

export const migrations = [
  {
    up: migration_20250322_121159_initial.up,
    down: migration_20250322_121159_initial.down,
    name: '20250322_121159_initial',
  },
  {
    up: migration_20250509_115910.up,
    down: migration_20250509_115910.down,
    name: '20250509_115910'
  },
];
