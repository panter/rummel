import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { AppInitSeeder } from './src/seeders/AppInitSeeder';

const config: Options = {
  driver: PostgreSqlDriver,
  host: 'localhost',
  port: 5432,
  dbName: 's1-crud',
  password: 'postgres',
  user: 'postgres',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: false,
  extensions: [Migrator, SeedManager],
  migrations: {
    snapshot: false,
    // disable foreign keys for migrations, to avoid problems with cloud sql
    // https://cloud.google.com/sql/docs/postgres/users#default-users
    disableForeignKeys: false,
  },
  seeder: {
    path: 'dist/**/seeders',
    pathTs: 'src/seeders',
    defaultSeeder: AppInitSeeder.name,
  },
};

export default config;
