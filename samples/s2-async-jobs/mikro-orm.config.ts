import { Options } from '@mikro-orm/postgresql';

const config: Options = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  dbName: 's2-async-jobs',
  password: 'postgres',
  user: 'postgres',
  // entities: ['dist/**/*.entity.js'],
  // entitiesTs: ['src/**/*.entity.ts'],
  debug: false,
  migrations: {
    snapshot: false,
    // disable foreign keys for migrations, to avoid problems with cloud sql
    // https://cloud.google.com/sql/docs/postgres/users#default-users
    disableForeignKeys: false,
  },
};

export default config;
