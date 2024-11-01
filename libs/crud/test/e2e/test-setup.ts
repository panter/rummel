import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

export let pgContainer: StartedPostgreSqlContainer;

export default async () => {
  console.log('Starting PostgreSQL (pgContainer) container');
  console.time('pgContainer');
  if (!global.pgContainer) {
    console.log('Creating new PostgreSQL (pgContainer) container');
    global.pgContainer = await new PostgreSqlContainer('postgres:13.3-alpine')
      .withExposedPorts(5432)
      .withStartupTimeout(60000)
      .start();
  } else {
    console.log('Reusing existing PostgreSQL (pgContainer) container');
  }
  console.timeEnd('pgContainer');
};
