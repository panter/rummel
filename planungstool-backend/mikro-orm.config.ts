import * as process from 'process';

import { AppInitSeeder } from './seeders/AppInitSeeder';
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

// TODO: this should be remove as soon as catladder provides a compatible `DATABASE_URL` env var
const dbConfig =
  (process.env.ENV_SHORT || 'local') === 'local'
    ? {
        clientUrl: process.env.DATABASE_URL,
      }
    : {
        dbName: process.env.DB_NAME,
        host: `/cloudsql/${process.env.CLOUD_SQL_INSTANCE_CONNECTION_NAME}`,
        password: process.env.DB_PASSWORD,
      };

const config: Options<PostgreSqlDriver> = {
  ...dbConfig,
  schema: 'public',
  type: 'postgresql',
  metadataProvider: TsMorphMetadataProvider,
  highlighter:
    process.env.NODE_ENV === 'local' ? new SqlHighlighter() : undefined,
  entities: ['dist/**/*.entity.js', '../libs/**/*.entity.js'],
  entitiesTs: ['apps/**/*.entity.ts', '../libs/**/*.entity.ts'],
  migrations: {
    snapshot: false,
    // disable foreign keys for migrations, to avoid problems with cloud sql
    // https://cloud.google.com/sql/docs/postgres/users#default-users
    disableForeignKeys: false,
  },
  debug: true,
  seeder: {
    defaultSeeder: AppInitSeeder.name,
  },
};

export default config;
