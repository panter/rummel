// global.d.ts
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

declare global {
  // eslint-disable-next-line no-var
  var pgContainer: StartedPostgreSqlContainer;
}
